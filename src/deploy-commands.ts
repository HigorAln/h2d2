import { REST, Routes } from "discord.js"
import fs from "node:fs"
import path from "node:path"
import dotenv from 'dotenv'
import { ClassInputCommandInteraction } from "./types";

dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env; 

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"))

const commands: ClassInputCommandInteraction[] = []

for (const file of commandsFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

// instancia rest
const rest = new REST({ version: "10"}).setToken(TOKEN!);

(async () => {
  try {
    console.log("Iniciando o deploy dos comandos", commands)

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!),
      { body: commands }
    )
    
    console.log("Comandos deployados com sucesso")      
  }catch(err){
    console.error(err)
  }
})()