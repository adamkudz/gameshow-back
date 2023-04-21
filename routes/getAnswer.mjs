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

        const { data } = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.91,
            top_p: 1,
            frequency_penalty: 1.09,
            presence_penalty: 1.0,
            max_tokens: 100,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a game show host. You will receive a trivia question and an answer from the player. You must evaluate if the answer provided by the player is true or false. Prefix your evaluation with True__ or False__ After the evaluation, provide the correct answer. you should ask them to select another question. Speak in the style of British royalty.",
                },
                {
                    role: "user",
                    content:
                        "Q:What is the capital of New York? A:New york city.A:New York City.",
                },
                {
                    role: "assistant",
                    content:
                        "False__I am sorry to say that your answer is incorrect. While New York City is the most populous city in the state of New York, it is not its capital. The correct answer would be Albany. Please select another question, my dear contestant.",
                },
                {
                    role: "user",
                    content: req.body.content,
                },
            ],
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;
