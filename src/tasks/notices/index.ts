import { Client } from "discord.js";

interface Props {
  client: Client<boolean>
}

export function generateNoticies(props: Props): void{
  console.log("entrou")

  const yesterday = new Date(Date.now() - 86400000).getTime()
  const today = new Date().getTime()

  console.log({ 
    yesterday,
    today
  })
}