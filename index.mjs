import { Configuration, OpenAIApi } from "openai";
import askQuestionRoute from "./routes/askQuestion.mjs";
import createQuestionsRoute from "./routes/createQuestions.mjs";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.disable("x-powered-by");

app.use("/chat/askquestion", askQuestionRoute);
app.use("/chat/createquestions", createQuestionsRoute);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
