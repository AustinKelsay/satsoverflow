import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { useDispatch } from "react-redux";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  events: {
    signIn: async (ctx) => {
      const { name, email } = ctx.user;
      axios
        .post("http://localhost:3000/api/users", { username: name, key: name })
        .then((res) => {
          if (res.status === 201) {
            // User doesnt exist, add to db
          } else if (res.status === 200) {
            // User exists, do nothing
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
