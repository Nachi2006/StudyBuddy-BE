const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: "User already exists" });
    const user = new User({ name, email, password });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not logged in" });
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out" });
};

module.exports = { signup, login, logout, getMe };
