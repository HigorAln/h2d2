import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, CacheType } from "discord.js"
import { prisma } from "../lib/prisma";

const tokenCommand = {
  data: new SlashCommandBuilder()
    .setName("token")
    .setDescription("Tokens são usados para comprar itens no bot")

    .addSubcommand(subcommand =>
      subcommand
        .setName("pegar")
        .setDescription("Pega um tokens diários")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("ver")
        .setDescription("Verifica quantos tokens você tem")
    ),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const subcommand = interaction.options.getSubcommand()

    if (!subcommand) return interaction.reply("Você precisa escolher uma opção")

    if (subcommand === "ver") {
      token.viewToken({ interaction, userId: interaction.user.id })
    } else if (subcommand === "pegar") {
      token.getToken({ interaction, userId: interaction.user.id })
    }
  }
}

interface OptionToken {
  userId: string;
  interaction: ChatInputCommandInteraction<CacheType>;
}

const token = {
  async viewToken({ userId, interaction }: OptionToken) {
    const findUser = await prisma.user.findUnique({
      where: {
        identify: userId,
      }
    })

    if (!findUser) {
      const currentDate = new Date();
      const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const timeYesterday = yesterday.getTime()

      await prisma.user.create({
        data: {
          identify: userId,
          tokens: 0,
          time_last_token: timeYesterday,
        }
      })

      interaction.reply("Você contem 0 tokens")
    } else {
      interaction.reply(`Você contem ${findUser.tokens} tokens`)
    }
  },

  async getToken({ interaction, userId }: OptionToken) {
    const randomToken = Math.floor(Math.random() * 100) + 1

    const findUser = await prisma.user.findUnique({
      where: {
        identify: userId,
      }
    })

    if (!findUser) {
      const currentDate = new Date();
      const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const timeYesterday = yesterday.getTime()

      await prisma.user.create({
        data: {
          identify: userId,
          tokens: randomToken,
          time_last_token: currentDate.getTime(),
        }
      })

      interaction.reply(`Você pegou ${randomToken} tokens`)
    } else {
      const currentDate = new Date();

      const difference = currentDate.getTime() - findUser.time_last_token

      // verify if the user has already collected the token in the last 24 hours
      if (difference < 86400000) {
        return interaction.reply("Você já pegou os tokens hoje")
      }

      await prisma.user.update({
        where: {
          identify: userId,
        },
        data: {
          tokens: findUser.tokens + randomToken,
          time_last_token: currentDate.getTime(),
        }
      })

      interaction.reply(`Você pegou ${randomToken} tokens`)
    }

  }
}

module.exports = tokenCommand
