const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth-middleware");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route GET api/profile/me
// @desc Get current Users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
      return;
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
