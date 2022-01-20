const Sequelize = require("sequelize");
const db = require("../db");

const LastActive = db.define("last_active", {
  convoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = LastActive;
