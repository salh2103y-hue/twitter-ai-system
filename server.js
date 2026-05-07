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

app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }

    // 🔥 هذا هو الـ Prompt الذكي
    const prompt = `
أنت كاتب محتوى احترافي على تويتر (X).

اكتب تغريدة قوية وجذابة عن: ${topic}

القواعد:
- قصيرة (1 إلى 3 سطور فقط)
- أسلوب شبابي وطبيعي
- فيها إيموجي مناسب 🔥✨📌
- اجعلها تثير التفاعل أو السؤال
- أضف هاشتاق أو اثنين في النهاية
- لا تكن رسمي أو تقريري
`;

    // 🔥 هنا استدعاء الذكاء الاصطناعي (عدّل حسب مزودك)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "Error generating tweet";

    return res.json({
      text,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
    });
  }
});
