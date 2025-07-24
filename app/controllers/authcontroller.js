const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");


handleRegister = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, firstName, lastName });
    await user.save();
    const token = jwt.sign({ email }, "zzz", { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};


handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email }, "zzz", { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


handleLogout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ message: "Logged out successfully" });
};




handleGetMe = (req, res) => {
  const { email, firstName, lastName, _id } = req.user;
  res.json({ user: { email, firstName, lastName, _id } });
};


module.exports = {
  handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe};
