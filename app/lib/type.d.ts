// types/next-auth.d.ts or somewhere globally accessible
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: "ADMIN" | "USER";
      provider?: "GOOGLE" | "TWITTER" | "CREDENTIALS";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name:string;
    email:string;
    role?: "ADMIN" | "USER";
    provider?: "GOOGLE" | "TWITTER" | "CREDENTIALS";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name:string;
    email:string;
    role?: "ADMIN" | "USER";
    provider?: "GOOGLE" | "TWITTER" | "CREDENTIALS";
  }
}
