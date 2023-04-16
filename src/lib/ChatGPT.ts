import { ChatGPTAPI } from 'chatgpt'

export const chatgpt = new ChatGPTAPI({ apiKey: process.env.SECRET_KEY! })
