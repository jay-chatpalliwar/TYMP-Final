const OpenAi = require("openai");
const API_URL = "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";

exports.chatgpt = async (req, res) => {
  try {
    const openai = new OpenAi({
      apiKey: API_URL,
    });
    const prompt = req.body.prompt;
    console.log(prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5",
      messages: prompt,
      temperature: 0,
      max_tokens: 256,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
