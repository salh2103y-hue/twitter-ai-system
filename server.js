const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();

app.use(express.json());

// إعداد Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("Twitter AI System is running 🚀");
});

// API AI الحقيقي
app.post("/api/generate", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.json({ error: "no topic provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `اكتب تغريدة قصيرة ومميزة عن: ${topic}`
    );

    const response = await result.response;

    res.json({
      tweet: response.text()
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
