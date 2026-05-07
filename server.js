import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Twitter AI System is running");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "topic is required",
      });
    }

    return res.json({
      text: `🔥 ${topic} موضوع مهم اليوم يستحق المتابعة 👀 #ترند`,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "server error",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
