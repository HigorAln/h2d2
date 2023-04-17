import { Client, Events, GatewayIntentBits, Collection, Interaction, CacheType } from 'discord.js'
import fs from "node:fs"
import path from "node:path"
import dotenv from 'dotenv'

dotenv.config();

const { TOKEN } = process.env; 

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".(ts|js)"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = new Collection()

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  
  if ("data" in command && "execute" in command) {
    commands.set(command.data.name, command)
  }else {
    console.log(`Esse comando ${file} não e valido!`)
  }
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
  console.log({ interaction: interaction.isChatInputCommand })
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName) as {execute: (data: Interaction<CacheType>) => Promise<void>}

  if (!command) {
    console.error("Comando não encontrado")
    return
  }

  try {
    await command.execute(interaction)
  }catch(err){
    console.error(err)
    await interaction.reply({ content: "Ocorreu um erro ao executar esse comando", ephemeral: true })
  }
})