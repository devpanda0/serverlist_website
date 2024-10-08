import NextAuth from "next-auth"
import Discord from "@auth/core/providers/discord";
import axios from "axios";
import prisma from "./prisma";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    debug: false,
    session: { strategy: "jwt" },
    trustHost: true,
    providers: [
        Discord({
            id: "discord",
            name: "Discord",
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: process.env.DISCORD_URL,
        })
    ],
    callbacks: {
        async jwt({ token }) {
            const discordId = token.picture!.split("/")[4]
            const { data } = await axios.get(`http://localhost:3001/discord/user/${discordId}`)
            return {
                ...token,
                maxGroups: data.maxGroups,
                maxServers: data.maxServers,
                userId: data.id,
                roleName: data.roleName,
                roleColor: data.roleColor,
            }
        },
        async session({ session, token }) {
            if (session && session.user && token) {
                session.user.maxGroups = token.maxGroups as number;
                session.user.maxServers = token.maxServers as number;
            }
            return session;
        },
        async signIn({ user, account }) {
            return fetch("https://discord.com/api/users/@me/guilds/1290249393236348958/member", {
                method: "GET",
                headers: {
                    authorization: "Bearer " + account?.access_token,
                }
            }).then(async (res) => {
                if (res.ok) {
                    try {
                        const data = await res.json();
                        const role = (await prisma.role.findMany({ where: { default: true } }))[0]
                        const dcUser = await prisma.user.upsert({
                            where: { discordId: data.user.id },
                            create: {
                                discordId: data.user.id,
                                username: data.user.username,
                                roleId: role.id
                            },
                            update: { username: data.name }
                        })
                        return dcUser && !dcUser.banned;
                    } catch (error) {
                        console.log("error", error)
                        return false;
                    }
                } else {
                    return false;
                }
            }).catch((error) => {
                return false;
            })
        }
    }
})
