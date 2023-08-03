import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userRepositoryImpl = () => {
  const signup = async (userData: any) => {
    return prisma.user.create({ data: userData });
  };

  const login = async (userId: String) => {
    return prisma.user.findUnique({ where: { id: Number(userId) } });
  };
  const getByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  };

  return {
    signup,
    login,
    getByEmail,
  };
};

type userRepositoryImpl = ReturnType<typeof userRepositoryImpl>;
export default userRepositoryImpl;
