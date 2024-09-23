import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import databaseConnection from "../db";
import { User as UserModel } from "@/models";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await databaseConnection();
        const user = await UserModel.findOne({
          username: credentials?.username,
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValid = await user.comparePassword(credentials?.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user._id.toString(),
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token,
        name: token.name || "",
      };
      return session;
    },
  },
};

export default authOptions;
