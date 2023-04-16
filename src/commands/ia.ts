import { SlashCommandBuilder, CacheType, ChatInputCommandInteraction } from "discord.js"
import { havePermissionToDoQuestion } from "../modules/ia/useCases/havePermissionToDoQuestion"
import { chatQuestion } from "../modules/ia/useCases/chatQuestion"

const iaCommand = {
  data: new SlashCommandBuilder()
    .setName("ia")
    .setDescription("Faz uma pergunta para a IA")

    .addStringOption(option =>
      option
        .setName("pergunta")
        .setDescription("Faça uma pergunta para a IA")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const pergunta = interaction.options.getString('pergunta')
    if (!pergunta) return await interaction.reply("Escreva uma pergunta para a IA")

    const havePermission = await havePermissionToDoQuestion()
    if (!havePermission) return await interaction.reply("Aguarde 1 minuto para fazer outra pergunta")

    await interaction.deferReply()
    chatQuestion(pergunta, interaction)
  }
}

module.exports = iaCommand
