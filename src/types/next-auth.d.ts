import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            discordId: string;
            accountId: string;
            maxServers: number;
            maxGroups: number;
            roleName: string;
            roleColor: string;
        } & DefaultSession["user"]
    }
}