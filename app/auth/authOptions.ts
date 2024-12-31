import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Verificar si el usuario existe
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // Si el usuario no existe, lo creamos
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              image: user.image!,
              createdAt: new Date(), // Asignamos la fecha de creación manualmente
              updatedAt: new Date(), // Asignamos la fecha de actualización manualmente
            },
          });
        }

        return true; // Permite el inicio de sesión
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false; // Bloquea el inicio de sesión en caso de error
      }
    },
  },
  session: {
    strategy: "jwt",
  },
};
