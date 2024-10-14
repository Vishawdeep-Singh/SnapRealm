import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log("Credentials received:", credentials);
        const user = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (passwordValidation) {
            return {
              ...user,
              password: user.password ?? undefined, // Convert null to undefined
            };
          }
          return null;
        }
        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("Token", token);
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);

      if (account?.provider === "google") {
        const googleuser = await db.user.findUnique({
          where: {
            email: profile?.email,
          },
          select: {
            id: true,
          },
        });
        token.provider = "google";
        token._id = googleuser?.id.toString();
        token.email = profile?.email;
        token.username = profile?.name;
        token.picture = user?.image as string;
        return token;
      } else if (user) {
        token.provider = "credentials";
        token._id = user.id;
        token.username = user.username;
        token.email = user.email;
        return token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Token", token);
      console.log("session", session);
      console.log("User", user);

      if (token.provider === "google") {
        session.user = {
          _id: token._id as string,
          username: token.username as string,
          email: token.email as string,
          provider: token.provider,
          image: token.picture,
        };
        return session;
      } else {
        session.user = {
          _id: token._id as string,
          username: token.username as string,
          email: token.email as string,
          provider: token.provider as string,
        };
        console.log(session);
        return session;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("credentials", credentials);

      try {
        if (account?.provider === "google") {
          const user = await db.user.findUnique({
            where: {
              email: profile?.email,
            },
          });
          if (user?.provider === "credentials") {
            toast.error("Email is Already in use", {
              closeButton: true,
            });
            return false;
          }
          if (!user) {
            const newuser = await db.user.create({
              data: {
                email: profile?.email as string,
                username: profile?.name as string,
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
    signIn: "/signin",
    signOut: "/signout",
  },
};
