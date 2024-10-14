// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User and Session types
declare module "next-auth" {
  interface User extends DefaultUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    provider?: string; // Adding provider field
  }

  interface Session {
    user?: {
      _id?: string;
      username?: string;
      email?: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}
