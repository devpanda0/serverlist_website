import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const role = await prisma.role.createMany({
        data: [
            {
                name: "Developer",
                roleId: "1290370636514066535",
                color: "#00ffec",
                default: false
            },
            {
                name: "User",
                roleId: "1292808912420081696",
                color: "#505",
                default: true
            }
        ]
    })

    // const type = await prisma.gameType.create({
    //     data: {
    //         name: "Minecraft",
    //         logo: "https://cdn.iconscout.com/icon/free/png-256/minecraft-3-569467.png",
    //         primaryColor: "#009688",
    //         secondaryColor: "#004d40",
    //     }
    // })
    //
    // const group = await prisma.group.create({
    //     data: {
    //         gameTypeId: type.id,
    //         name: "Test",
    //         logo: "https://cdn.iconscout.com/icon/free/png-256/minecraft-3-569467.png",
    //         servers: {
    //             createMany: {
    //                 data: [
    //                     {
    //                         name: "Test",
    //                         gamemode: "Survival",
    //                         gameTypeId: type.id,
    //                         icon: "https://cdn.iconscout.com/icon/free/png-256/minecraft-3-569467.png",
    //                         ipAddress: "localhost:25565",
    //                         description: "Test",
    //                         language: "German",
    //                         publicVisibility: true,
    //                     },
    //                     {
    //                         name: "Test1",
    //                         gamemode: "Creative",
    //                         gameTypeId: type.id,
    //                         icon: "https://cdn.iconscout.com/icon/free/png-256/minecraft-3-569467.png",
    //                         ipAddress: "localhost:25566",
    //                         description: "Test",
    //                         language: "German",
    //                         publicVisibility: false,
    //                     },
    //                 ]
    //             }
    //         }
    //     }
    // })

    return NextResponse.json({ success: true })
}