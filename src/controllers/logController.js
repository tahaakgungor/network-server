const Log = require("../models/log");
const dotenv = require("dotenv");
dotenv.config();

const logController = {};

logController.deleteUserLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    console.log("log deleted successfully");
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


logController.getUserLog = async (req, res) => {
  try {
    const userId = req.params.id;
    const userLog = await Log.find({ user: userId });

    res.status(200).json(userLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


logController.getUserLastLog = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(404).json({ message: "User not found" }
    )
    const lastLog = await Log.find({ user: userId }).sort({ createdAt: -1 }).limit(1);

    res.status(200).json(lastLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


logController.updateUserLog = async (req, res) => {
  try {
    const { duration, activity, status, logouttime } = req.body;
    const updatedLog = await Log.findByIdAndUpdate(
      { _id: req.params.id },
      {
        duration,
        activity,
        status,
        logouttime,
      },
      { new: true }
    );

    res.status(200).json(updatedLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


logController.postUserLog = async (req, res) => {
  try {
    const {
      user,
      date,
      status,
      logintime,
      logouttime,
      duration,
      activity,
      notes,
    } = req.body;

    const newLog = new Log({
      user,
      date,
      logintime,
      logouttime,
      status,
      duration,
      activity,
      notes,
    });

    await newLog.save();
    console.log("newLog", newLog);
    res.status(201).json({ message: "Log created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = logController;
