import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        //get user like credientials.indentifier etc and compareit with the db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        const googleuser = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
          select: {
            id: true,
          },
        });

        token.provider = "google";
        token.sub = googleuser?.id.toString();
        token.email = profile?.email;
        token.name = profile?.name;
        token.picture = user?.image as string;
        return token;
      } else if (user) {
        token.provider = "credentials";
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        return token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log(token);

      if (token.provider === "google") {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider,
          role: token.role as string,
          image: token.picture,
        };
        return session;
      } else {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider as string,
          role: token.role as string,
          number: token.number as string,
        };
        console.log(session);
        return session;
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account?.provider === "google") {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });
          if (user?.provider === "credentials") {
            toast.error("Email is Already in use", {
              closeButton: true,
            });
            console.log("gdfadsfasdfads");
            return false;
          }
          if (!user) {
            const newuser = await prisma.user.create({
              data: {
                email: profile?.email as string,
                name: profile?.name as string,
                cellPh: "",
                roles: {
                  create: {
                    roleName: "ADMIN",
                  },
                },
                provider: "google",
              },
            });
          }
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
  },

  pages: {
    signIn: "/signup",
    error: "/error",
  },
};
