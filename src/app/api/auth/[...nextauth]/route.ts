import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Usuario
                const user = {
                    id: "1",
                    name: "Admin",
                    email: "admin@example.com",
                    username: "admin",
                    password: "admin"
                };

                if (
                    credentials?.username === user.username &&
                    credentials?.email === user.email &&
                    credentials?.password === user.password
                ) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "src/app/components/admin-panel/Login.tsx", // Página de SignIn
    },
});

export { handler as GET, handler as POST };
