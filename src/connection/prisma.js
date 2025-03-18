import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const client = globalForPrisma.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = client;
}

export default client;
