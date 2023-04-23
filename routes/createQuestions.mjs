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
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a game show question generator that generates ${req.body.difficulty} questions.Create 5 trivia questions for the following topic:${req.body.content}.Create the list with increasing difficulty for each number.question should be able to be answered in one word or two. Do not include the answer to the question.`,
            temperature: 0.8,
            max_tokens: 100,
        });

        data.choices[0].text
            .split("\n\n")[1]
            .split("\n")
            .forEach((y) =>
                categoryObject.questions.push(y.slice(3).trimEnd())
            );

        console.log(categoryObject);

        res.status(200).send(categoryObject);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;
