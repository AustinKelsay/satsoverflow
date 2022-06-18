import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import { publicFetch } from "../../../util/fetcher";

export default (req, res) => NextAuth(req, res, options);

const options = {
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.id) {
        token.id = user.id;
      }

      if (token?.id) {
        const { name } = await prisma.user.findUnique({
          where: { id: token.id },
        });
        token.name = name;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Lightning",
      credentials: {
        pubkey: { label: "publickey", type: "text" },
        k1: { label: "k1", type: "text" },
      },
      async authorize(credentials, req) {
        const { k1, pubkey } = credentials;
        try {
          // get lnauth model using k1
          const lnauth = await publicFetch.get(`/auth/lnauth/${k1}`).data;
          if (lnauth.pubkey === pubkey) {
            // get user model using pubkey
            let user = await publicFetch.get(`/auth/user/${pubkey}`).data;
            if (!user) {
              // create user model using pubkey
              user = await publicFetch.post(`/auth/user/create`, {
                name: pubkey.slice(0, 10),
                pubkey: pubkey,
              }).data;
            }
            // delete lnauth model using k1
            let deleted = await publicFetch.delete(`/auth/lnauth/${k1}`);
            return user;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  pages: {
    signIn: "/login",
    error: "/404",
  },
};
