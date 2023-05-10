import type { NextAuthOptions } from 'next-auth'
// import Google from 'next-auth/providers/google'
// import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt'
import {PrismaAdapter} from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    providers: [
        // Other providers give errors still: missing PKCE
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        // Github({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!
        // }),
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {
                    name: 'username',
                    label: 'Username (optional)',
                    type: 'text',
                    placeholder: 'OatsProgramming'
                },
                email: {
                    name: 'email',
                    label: 'Email (optional)',
                    type: 'email',
                    placeholder: 'jackoatmeals@gmail.com'
                },
                password: {
                    name: 'password',
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                // This works "fine"
                // if (!credentials) return null
                // return {
                //     id: crypto.randomUUID(),
                //     email: credentials.email ?? '',
                //     name: credentials.username ?? '',
                // }

                if ((!credentials?.username && !credentials?.email) || !credentials?.password) {
                    return null
                }

                try {
                    // Get user from database
                    const user = await prismadb.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials.email },
                                { name: credentials.username }
                            ]
                        }
                    })

                    // See if 404 or password mismatch
                    if (!user) return null
                    else if (!await compare(credentials.password, user.hashedPassword)) return null

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        items: user.items,
                    }

                } catch (err) {
                    console.error(err)
                    return null
                }
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log(session)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    items: token.items
                }
            }
        },
        jwt: ({ user, token }) => {
            console.log(token)
            if (user) {
                return {
                    ...token,
                    ...user,
                }
            }
            return token
        }
    },
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
