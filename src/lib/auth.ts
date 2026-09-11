import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const githubConfigured = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);
export const authOptions: NextAuthOptions = {
  providers: githubConfigured ? [GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET!, authorization: { params: { scope: "read:user" } } })] : [],
  callbacks: {
    async jwt({ token, account }) { if (account) token.accessToken = account.access_token; return token; },
    async session({ session, token }) { session.accessToken = token.accessToken as string | undefined; return session; },
  },
};
