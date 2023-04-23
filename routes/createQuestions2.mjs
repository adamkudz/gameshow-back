import express from "express";
import { messages as prompts } from "../prompts/chatPrompts.mjs";

import { createQuestionPrompt2 } from "../prompts/createQuestionPrompt.mjs";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { request } from "http";
dotenv.config();
const router = express.Router();
const configuration = new Configuration({
    organization: "org-o3G5e4ziOaVOXVDnPgu5iFOc",
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    const categoryObject = {
        category: "",
        questions: [],
    };
    try {
        const openai = new OpenAIApi(configuration);

        categoryObject.category = req.body.content;
        const topic = req.body.content;

        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a trivia master! Generate the following trivia questions about ${topic} with increasing difficulty:\n1. Easy: What is the capital city of ${topic}?\n2. Moderate: Name three famous ${topic}s from history.\n3. Difficult: In which country is ${topic} located?\n4. Easy: How many ${topic} species are there in the world?\n5. Moderate: What are the main uses of ${topic} in everyday life?\n6. Difficult: Name one interesting fact about ${topic}.`,
            temperature: 0.8,
            max_tokens: 50,
            n: 10,
        });
        const questions = data.choices.map((choice) => choice.text.trim());
        console.log(questions);
        console.log(data);

        // data.choices[0].text
        //     .split("\n\n")[1]
        //     .split("\n")
        //     .forEach((y) =>
        //         categoryObject.questions.push(y.slice(3).trimEnd())
        //     );

        // console.log(categoryObject);

        // res.status(200).send(categoryObject);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;
