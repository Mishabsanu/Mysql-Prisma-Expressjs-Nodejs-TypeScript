import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
  } catch (error: any) {
    console.error("Database connection failed:", (error as Error).message);
  } finally {
    await prisma.$disconnect();
  }
};

export default checkDatabaseConnection;
