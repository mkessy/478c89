const activityArrayToMap = (activityArr) => {
  return activityArr
    .map((activity) => activity.dataValues)
    .reduce((prev, cur) => {
      prev[cur.convoId] = cur.timeStamp;
      return prev;
    }, {});
};

module.exports = activityArrayToMap;
