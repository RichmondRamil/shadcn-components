// DEPENDENCIES
import NextAuth from 'next-auth';
// TYPES
import type { NextAuthOptions } from 'next-auth';

// NextAuthOptions please read at https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {},
};

export default NextAuth(authOptions);
