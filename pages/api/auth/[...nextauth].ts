import createNextAuthAllAccess from '@takeshape/next-auth-all-access'
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import path from 'path'

console.log(path.resolve(process.cwd(), './keys/jwks.json'))
const withAllAccess = createNextAuthAllAccess({
  issuer: 'zerodev',
  jwksPath: path.resolve(process.cwd(), './keys/jwks.json'),
  clients: [
    {
      id: 'zerodev:client',
      audience: 'urn:zerodev:client',
      expiration: '6h',
      // Optional whitelist — exp and iat will always be included
      allowedClaims: ['email', 'sub'],
    },
  ],
});

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default withAllAccess(NextAuth, authOptions)
