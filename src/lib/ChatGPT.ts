import { OpenAIApi, Configuration } from 'openai'

const apiKey = process.env.SECRET_KEY!

const configuration = new Configuration({
  apiKey: apiKey,
})

export const chatgpt = new OpenAIApi(configuration)