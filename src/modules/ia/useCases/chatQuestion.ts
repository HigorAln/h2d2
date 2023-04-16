import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { chatgpt } from "../../../lib/ChatGPT";
import { EmbedBuilder } from "discord.js";

export async function chatQuestion(question: string, interaction: ChatInputCommandInteraction<CacheType>){
  const response = await chatgpt.sendMessage(question)

  const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(`Pergunta: ${question}`)
  .setDescription(response.text)
  .setTimestamp()

  interaction.editReply({ embeds: [embed] })
}