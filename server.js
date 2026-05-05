const { GoogleGenerativeAI } = require("@google/generative-ai");const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Twitter AI System is running 🚀");
});

// AI endpoint (توليد تغريدة)
app.post("/api/generate", (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.json({ error: "no topic provided" });
  }

  const tweet = `🔥 ${topic} موضوع مهم اليوم يستحق المتابعة`;

  res.json({ tweet });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get("/api/test", (req, res) => {
  const topic = req.query.topic;

  if (!topic) {
    return res.send("اكتب ?topic=شيء في الرابط");
  }

  const tweet = `🔥 ${topic} موضوع مهم اليوم يستحق المتابعة`;

  res.send(tweet);
});
app.get("/api/generate", async (req, res) => {
  const topic = req.query.topic;

  if (!topic) {
    return res.send("اكتب ?topic=أي شيء");
  }

  const tweet = `🔥 ${topic} موضوع مهم اليوم يستحق المتابعة`;

  res.send(tweet);
});
