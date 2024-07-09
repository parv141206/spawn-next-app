import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Name" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        return fetch("http://localhost:3000/api/db/auth/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res._id) {
              return Promise.resolve({
                //@ts-ignore
                name: credentials.username,
              });
            } else {
              return Promise.resolve(null);
            }
          });
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
  logger: {
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  },
});
export { handler as GET, handler as POST };
