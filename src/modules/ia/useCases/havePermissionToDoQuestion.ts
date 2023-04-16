import { prisma } from "../../../lib/prisma";

export async function havePermissionToDoQuestion(): Promise<boolean>{
  const chat = await prisma.chat.findFirstOrThrow()

  const time = new Date().getTime()
  const timeLastMessage = chat.time_last_message

  const timeDifference = time - timeLastMessage

  const minutesDifference = Math.floor(timeDifference / 60000)

  if (minutesDifference >= 1) {
    await prisma.chat.update({
      where: {
        id: chat.id
      },
      data: {
        time_last_message: new Date().getTime()
      }
    })
    return true
  }else {
    return false
  }
}