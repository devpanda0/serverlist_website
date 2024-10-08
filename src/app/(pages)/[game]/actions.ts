"use server";

import prisma from "@/lib/prisma";

export async function getGroups(game: string) {
    return prisma.group.findMany({ include: { servers: { where: { gameType: { name: game } } } } })
}

export async function getServers(game: string) {
    return prisma.server.findMany({ where: { gameType: { name: game }, groupId: null } })
}