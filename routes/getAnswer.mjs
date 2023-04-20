import express from "express";
import { messages as prompts } from "../prompts/chatPrompts.mjs";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const configuration = new Configuration({
    organization: "org-o3G5e4ziOaVOXVDnPgu5iFOc",
    apiKey: process.env.OPENAI_API_KEY,
});

// router.post("/", async (req, res) => {
//     try {
//         const openai = new OpenAIApi(configuration);

//         const messages = [...prompts, req.body];

//         const completion = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             temperature: 0.8,
//             top_p: 1,
//             frequency_penalty: 0.86,
//             presence_penalty: 0.9,
//             max_tokens: 100,
//             messages: messages,
//         });
//         // prompt.push({ role: role, content: content });
//         res.status(200).json(completion.data.choices[0].message);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

export default router;
