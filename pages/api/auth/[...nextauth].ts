import createNextAuthAllAccess from "@takeshape/next-auth-all-access";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import path from "path";

const backendBaseURL = process.env.BACKEND_BASE_URL;

console.log(path.resolve(process.cwd(), "./keys/jwks.json"));
const withAllAccess = createNextAuthAllAccess({
  issuer: "https://www.api.charii.org",
  jwksPath: path.resolve(process.cwd(), "./keys/jwks.json"),
  clients: [
    {
      id: "zerodev:client",
      audience: "https://www.charii.org",
      expiration: "6h",
      // Optional whitelist — exp and iat will always be included
      allowedClaims: ["email", "sub"],
    },
  ],
});

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "willmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${backendBaseURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const loginRes = await res.json();

        // If no error and we have user data, return it
        if (res.ok && loginRes) {
          const at = loginRes.data.accessToken;
          const res = await fetch(`${backendBaseURL}/auth/me`, {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${at}`,
            },
          });
          const user = await res.json();
          return user.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      token.userRole = "admin";
      // if (user) {
      //   token.email = user.email;
      //   token.sub = user.id;
      //   token.picture = user.image;
      // }
      // if (account) {
      //   token.accessToken = account.access_token;
      // }
      return token;
    },
  },
};

export default withAllAccess(NextAuth, authOptions);
