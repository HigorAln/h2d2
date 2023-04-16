import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js'

export interface ClassInputCommandInteraction {
  data: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}