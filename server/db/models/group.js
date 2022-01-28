const Sequelize = require("sequelize");
const db = require("../db");
const { User, Conversation } = require(".");

const Group = db.define("group", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  convoId: {
    type: Sequelize.INTEGER,
    references: {
      model: Conversation,
      key: "convoId",
    },
  },
});

module.exports = Group;
