// backend/routes/historyRoutes.js
import express from "express";
import History from "../models/History.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  console.log("🟨 RECEIVED HISTORY ADD REQUEST:", req.body);

  try {
    const { userId, symptoms, results } = req.body;

    if (!userId) {
      console.log("❌ history add: missing userId");
      return res.status(400).json({ success: false, error: "userId required" });
    }

    if (!Array.isArray(symptoms) || !Array.isArray(results)) {
      console.log("❌ history add: invalid payload", { symptoms, results });
      return res.status(400).json({ success: false, error: "invalid payload" });
    }

    const entry = await History.create({ userId, symptoms, results });
    console.log("🟩 History saved:", entry._id);

    res.json({ success: true, historyId: entry._id });
  } catch (err) {
    console.error("History Save Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (err) {
    console.error("History Fetch Error:", err);
    res.status(500).json({ success: false });
  }
});

export default router;

