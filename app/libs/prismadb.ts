import { PrismaClient } from "@prisma/client"

//declare type for prisma, global recognition
declare global {
  var prisma: PrismaClient | undefined
}

//best practice in using prisma with next13
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client