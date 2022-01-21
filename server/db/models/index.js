const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const LastActive = require("./lastActive");

// associations

User.hasMany(Conversation);
User.hasMany(LastActive);
LastActive.belongsTo(User);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  LastActive,
};
