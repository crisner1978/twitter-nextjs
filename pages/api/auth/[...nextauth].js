import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

// import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
})