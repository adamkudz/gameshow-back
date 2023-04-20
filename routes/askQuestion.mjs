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

router.post("/", async (req, res) => {
    try {
        const openai = new OpenAIApi(configuration);

        const messages = [...prompts, ...req.body.prompts];
        console.log(messages);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 1.8,
            presence_penalty: 0.89,
            max_tokens: 100,
            messages: messages,
        });

        res.status(200).json(completion.data.choices[0].message);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;
