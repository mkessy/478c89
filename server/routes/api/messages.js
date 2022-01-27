const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

const onlineUsers = require("../../onlineUsers");

// expects {conversationId} in body
router.patch("/update", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (!req.body.convoId) {
      return res.message("ConversationId Required").sendStatus(400);
    }
    const userId = req.user.id;
    const { convoId } = req.body;

    const data = await Message.update(
      { read: "1" },
      {
        where: {
          conversationId: convoId,
          [Op.not]: { senderId: userId },
        },
      }
    );
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, read } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        read,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      read,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
