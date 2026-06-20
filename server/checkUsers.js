require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
      goal: true,
      createdAt: true,
    },
  });

  console.log(users);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });