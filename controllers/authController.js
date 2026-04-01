const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    if(!user) return res.status(400).json({ error: "Invalid user data" });
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: "User already exists" });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json(user);
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

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out" });
};

module.exports ={signup,logout,login}
