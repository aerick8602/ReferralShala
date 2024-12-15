import { PrismaClient } from '@prisma/client';

const client = global.prismaGlobal || (() => {
  console.log("Creating new PrismaClient instance");
  return new PrismaClient();
})();

if (process.env.NODE_ENV !== 'production') {
  if (global.prismaGlobal) console.log("Reusing existing PrismaClient instance");
  global.prismaGlobal = client;
}

export default client;
