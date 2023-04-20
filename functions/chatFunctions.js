import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import messages from "./prompts/chatPrompts.mjs";
const configuration = new Configuration({
    organization: "org-o3G5e4ziOaVOXVDnPgu5iFOc",
    apiKey: process.env.OPENAI_API_KEY,
});
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    top_p: 0.41,
    frequency_penalty: 1.28,
    presence_penalty: 2,
    max_tokens: 256,
});
