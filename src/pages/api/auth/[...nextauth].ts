// DEPENDENCIES
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// TYPES
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: '',
      clientSecret: '',
    }),
  ],
};

export default NextAuth(authOptions);
