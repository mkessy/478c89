const Sequelize = require("sequelize");
const db = require("../db");
const { User, Message } = require(".");

const ReadStatus = db.define("readStatus", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  messageId: {
    type: Sequelize.INTEGER,
    references: {
      model: Message,
      key: "messageId",
    },
  },

  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: "0",
  },
});

module.exports = ReadStatus;
