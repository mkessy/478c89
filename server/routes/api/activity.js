const router = require("express").Router();
const { activityArrayToMap } = require("./helpers");

const { LastActive } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const userActivity = await LastActive.findAll({ where: { userId } });
    res.json(activityArrayToMap(userActivity));
  } catch (error) {
    next(error);
  }
});

// expects {convoId} in body
router.post("/update", async (req, res, next) => {
  try {
    if (!req.user || !req.body.convoId) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const { convoId } = req.body;

    // look for latest activity
    let activity = await LastActive.findOne({
      where: { userId: userId, convoId: convoId },
    });

    if (activity) {
      await activity.update({ timeStamp: Date.now() });
    } else {
      await LastActive.create({
        userId,
        convoId,
        timeStamp: Date.now(),
      });
    }

    const userActivity = await LastActive.findAll({ where: { userId } });
    return res.json(activityArrayToMap(userActivity));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
