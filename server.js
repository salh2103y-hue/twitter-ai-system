const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("Twitter AI System is running");
});

// API توليد التغريدات
app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    // تحقق من الإدخال
    if (!topic) {
      return res.status(400).json({
        error: "topic is required",
      });
    }

    // Prompt احترافي
    const prompt = `
أنت كاتب تغريدات احترافي على تويتر (X).

اكتب تغريدة قصيرة وجذابة عن:
${topic}

القواعد:
- قصيرة (1-3 سطور)
- أسلوب شبابي
- استخدم إيموجي 🔥✨📌
- أضف هاشتاق أو اثنين
- اجعلها تفاعلية
`;

    // موديل Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // توليد المحتوى
    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    // إرسال النتيجة
    return res.json({
      text,
    });

  } catch (error) {
    console.error("Generate Error:", error);

    return res.status(500).json({
      error: "AI generation failed",
      details: error.message,
    });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
