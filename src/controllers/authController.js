const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Log = require("../models/log");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const authController = {};

authController.getUser = async (req, res) => {
  try {
    
    const existingUser = await User.find({ email: req.body.email})
    console.log("existingUser", req.body);
    console.log("existingUsesr", existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

authController.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

authController.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



authController.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

authController.postRoles = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


authController.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

authController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );
    console.log("token", token);

    res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

authController.getUserLog = async (req, res) => {
  try {
    const userId = req.params.id;
    const userLogs = await Log.find({ user: userId });
    console.log("userLogs", userLogs);
    res.status(200).json(userLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

authController.postUserLog = async (req, res) => {
  try {
    const { user, date, time, duration, activity, notes } = req.body;
    const newLog = new Log({
      user,
      date,
      time,
      duration,
      activity,
      notes,
    });
    await newLog.save();
    res.status(201).json({ message: "Log created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};



module.exports = authController;
