import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, CacheType } from "discord.js"

const pingCommand = {
  data: new SlashCommandBuilder()
  .setName("playlist")
  .setDescription("Reproduz uma playlist do spotify")

  .addSubcommand(subcommand => 
    subcommand
    .setName("funk")
    .setDescription("Reproduz uma playlist de funk")
  )
  .addSubcommand(subcommand =>
    subcommand
    .setName("lofi")
    .setDescription("Reproduz uma playlist de rock")
  )
  .addSubcommand(subcommand => subcommand
    .setName("old")
    .setDescription("Reproduz uma playlist de de musicas antigas")
  ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const subcommand = interaction.options.getSubcommand()

    if (!subcommand) return await interaction.reply("Escolha uma playlist para reproduzir")

    if (subcommand === "funk") return await interaction.reply("https://open.spotify.com/playlist/0DkQhRU1kRlr05JORPcNb5?si=4ce1353eee714a8d");
    if (subcommand === "lofi") return await interaction.reply("https://open.spotify.com/playlist/37i9dQZF1DZ06evO0F0wVy?si=314eb2b35a2e4aff")
    if (subcommand === "old") return await interaction.reply("https://open.spotify.com/playlist/39yqfMOlMLrPFjiatBwY1p?si=dce35224b5604a82")
  }
}

module.exports = pingCommand
