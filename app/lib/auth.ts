import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../db";
import bcrypt from "bcryptjs";
import { sendSignInNotification } from "./mailer";
import { activeUserGauge } from "./metrics";

const authOptions: NextAuthOptions = {
  providers: [
    // --- Credentials Provider ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        username: { label: "Username", type: "text", placeholder: "testuser" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials):Promise<any> {
        const { email, password, username } = credentials ?? {};
        if (!email || !password) throw new Error("Missing email or password");
        const existingUser = await prisma.user.findFirst({ where: { email } });

        if (existingUser) {
          if (!existingUser.password) throw new Error("No password set. Please log in with Google.");

          const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
          if (!isPasswordCorrect) throw new Error("Invalid credentials");

          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            provider: existingUser.provider,
          };
        }

        // Create new user if not found
        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = (process.env.ADMIN_EMAILS?.split(",") || []).includes(email);

        const newUser = await prisma.user.create({
          data: {
            email,
            name: username!,
            password: hashedPassword,
            role: isAdmin ? "ADMIN" : "USER",
            provider: "CREDENTIALS",
          },
        });

        if(newUser){
          await sendSignInNotification(newUser);
        }

        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          provider: newUser.provider,
        };
      },
    }),

    // --- Google Provider ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
     async profile(profile):Promise<any> {
        const isAdmin = (process.env.ADMIN_EMAILS?.split(",") || []).includes(profile.email);

        return {
          id:profile.sub,
          name: profile.name,
          email: profile.email,
          role: isAdmin ? "ADMIN" : "USER",
          provider: "GOOGLE",
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "mysecret",

  events: {
    async createUser({ user }) {
      console.log("🆕 New user created:", user.email);
      await sendSignInNotification(user); // only runs on first signup
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("this is the token", token.id);

      if (user) {
        const dbUser = await prisma.user.findFirst({
          where:{
            email:user.email
          }
        })
        console.log(dbUser!.id)
        token.id = dbUser!.id || user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("this is the session",session)
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      const existingUser = await prisma.user.findFirst({ where: { email: user.email } });

      if (!existingUser && account) {
        const isAdmin = (process.env.ADMIN_EMAILS?.split(",") || []).includes(user.email);

       const newUser =  await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || profile?.name || "",
            role: isAdmin ? "ADMIN" : "USER",
            provider: account?.provider==="google"? "GOOGLE" : "TWITTER",
          },
        });
        await sendSignInNotification(newUser);
  
      }

      activeUserGauge.inc();

      return true;
    },
  },
};

export default authOptions;