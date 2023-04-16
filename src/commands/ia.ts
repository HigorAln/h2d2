

import { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, CacheType, TextInputStyle, ChatInputCommandInteraction, TextInputBuilder } from "discord.js"

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

    await interaction.reply(`Sua pergunta foi: ${pergunta}`)
  }
}

module.exports = iaCommand
