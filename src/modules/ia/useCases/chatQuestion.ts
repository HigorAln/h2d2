import { EmbedBuilder, ChatInputCommandInteraction, CacheType } from "discord.js";

export async function chatQuestion(question: string, interaction: ChatInputCommandInteraction<CacheType>){
  try {
    const { ChatGPTAPI } = await import("chatgpt");
    console.log({ secret: process.env.SECRET_KEY! })

    const api = new ChatGPTAPI({
      apiKey: process.env.SECRET_KEY!
    });


    const response = await api.sendMessage(question)

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Pergunta: ${question}`)
      .setDescription(response.text)
      .setTimestamp()
  
    interaction.editReply({ embeds: [embed] })
  } catch(err) {
    interaction.editReply(`Ocorreu um erro ao tentar executar o comando, Error: ${err}`)
  }
}