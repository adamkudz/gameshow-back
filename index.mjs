import { Configuration, OpenAIApi } from "openai";
import askQuestionRoute from "./routes/askQuestion.mjs";
import createQuestionsRoute from "./routes/createQuestions.mjs";
import createQuestionsRoute2 from "./routes/createQuestions2.mjs";
import getAnswer from "./routes/getAnswer.mjs";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
import { allowedNodeEnvironmentFlags } from "process";
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
app.use("/chat/createquestions2", createQuestionsRoute2);
app.use("/chat/getanswer", getAnswer);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
