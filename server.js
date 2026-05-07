app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "topic is required",
      });
    }

    const prompt = `
أنت كاتب محتوى احترافي على تويتر (X).

اكتب تغريدة جذابة عن: ${topic}

القواعد:
- قصيرة
- شبابية
- فيها إيموجي
- فيها هاشتاقات
`;

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
