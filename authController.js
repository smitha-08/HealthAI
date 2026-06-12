import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const encrypted = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: encrypted });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
