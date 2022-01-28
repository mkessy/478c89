const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require("./group");
const ReadStatus = require("./readstatus");

// associations
User.belongsToMany(Conversation, { through: Group });
Conversation.belongsToMany(User, { through: Group });

Message.belongsToMany(User, { through: ReadStatus });
User.belongsToMany(Message, { through: ReadStatus });

User.hasMany(Message, {
  foreignKey: "senderId",
});
Message.belongsTo(User);

Conversation.hasMany(Message, {
  foreignKey: "convoId",
});
Message.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
};
