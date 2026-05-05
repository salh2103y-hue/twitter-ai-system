const express = require("express");
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
