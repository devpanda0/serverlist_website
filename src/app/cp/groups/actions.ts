"use server";

import prisma from "@/lib/prisma";

export async function getGroups() {
    return prisma.group.findMany({ include: { servers: true } });
}

export async function getGroup(id: string) {
    return prisma.group.findUnique({ where: { id }, include: { servers: true } });
}

export async function createGroup(data: { name: string, logo: string }) {
    return prisma.group.create({ data });
}

export async function updateGroup(id: string, data: { name: string, logo: string }) {
    return prisma.group.update({ where: { id }, data });
}

export async function deleteGroup(id: string) {
    return prisma.group.delete({ where: { id } });
}
