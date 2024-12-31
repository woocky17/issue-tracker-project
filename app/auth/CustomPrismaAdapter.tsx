import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";

export function CustomPrismaAdapter(prismaClient: typeof prisma) {
  const adapter = PrismaAdapter(prismaClient);

  return {
    ...adapter,
    createUser: async (data: User) => {
      const now = new Date();
      return await prismaClient.user.create({
        data: {
          ...data,
          createdAt: now,
          updatedAt: now,
        },
      });
    },
  };
}
