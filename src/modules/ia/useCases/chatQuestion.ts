import { EmbedBuilder, ChatInputCommandInteraction, CacheType } from "discord.js";
import { chatgpt } from "../../../lib/ChatGPT";

export async function chatQuestion(question: string, interaction: ChatInputCommandInteraction<CacheType>){
  try {
    const completion = await chatgpt.createCompletion({
      model: "davinci",
      prompt: question,
      temperature: 0.5,
      max_tokens: 70
    })

    const response = completion.data.choices[0].text

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Pergunta: ${question}`)
      .setDescription(response || "")
      .setTimestamp()
  
    interaction.editReply({ embeds: [embed] })
  } catch(err) {
    interaction.editReply(`Ocorreu um erro ao tentar executar o comando, Error: ${err}`)
  }
}