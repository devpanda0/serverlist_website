"use client";
import { Box, Center, Group, Table } from "@mantine/core"
import { getGroups, getServers } from "./actions";
import { useEffect, useState } from "react";
import Image from "next/image";
// @ts-ignore
import { ServerGroup } from "@/types/general";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";

export default function Page({ params: { game } }: { params: { game: string } }) {
    const [groups, setGroups] = useState<any[]>([])
    const [servers, setServers] = useState<any[]>([])

    useEffect(() => {
        fetchGroups()
        fetchServers()
    }, [])

    const fetchGroups = async () => {
        const data = await getGroups(game)
        setGroups(data)
    }

    const fetchServers = async () => {
        const data = await getServers(game)
        setServers(data)
    }

    return (
        <Box>
            <Center w={'99dvw'}>
                <Table.ScrollContainer minWidth={'60dvw'} w={'60dvw'}>
                    <Table stickyHeader highlightOnHover withTableBorder borderColor={'white'}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={'3vw'}></Table.Th>
                                <Table.Th w={'10vw'}>Name</Table.Th>
                                <Table.Th w={'2vw'}>Gamemode</Table.Th>
                                <Table.Th w={'2vw'}>Language</Table.Th>
                                <Table.Th w={'2vw'} style={{ textAlign: 'right' }}>Players</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {groups.map((group: ServerGroup) => (
                                <ServerGroup group={group} key={group.id}/>
                            ))}
                            {servers.map((server) => (
                                <Table.Tr key={server.id}>
                                    <Table.Td w={'3vw'}><Image src={`data:image/png;base64,${server.icon}`} alt={''} width={100} height={100}/></Table.Td>
                                    <Table.Td w={'10vw'}>{server.name}</Table.Td>
                                    <Table.Td w={'2vw'}>{server.gameMode}</Table.Td>
                                    <Table.Td w={'2vw'}>{server.language}</Table.Td>
                                    <Table.Td w={'2vw'} style={{ textAlign: 'right' }}>{server.players}/{server.maxPlayers}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Center>
        </Box>
    )
}

function ServerGroup({ group }: { group: ServerGroup }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <Table.Tr key={group.id} onClick={toggle}>
                <Table.Td w={'3vw'}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        {opened ? <IconArrowDown /> : <IconArrowRight />}
                        <Image src={`data:image/png;base64,${group.logo}`} alt={''} width={50} height={50}/>
                    </Box>
                </Table.Td>
                <Table.Td w={'10vw'}>{group.name}</Table.Td>
                <Table.Td w={'2vw'}></Table.Td>
                <Table.Td w={'2vw'}></Table.Td>
                <Table.Td w={'2vw'} style={{ textAlign: 'right' }}>
                    {group.servers.reduce((acc, server) => acc + server.players, 0)} / {group.servers.reduce((acc, server) => acc + server.maxPlayers, 0)}
                </Table.Td>
            </Table.Tr>
            {opened && group.servers.map((server) => (
                <Table.Tr key={server.id} bg={'gray'}>
                    <Table.Td w={'3vw'}><Image src={`data:image/png;base64,${server.icon}`} alt={''} width={50} height={50}/></Table.Td>
                    <Table.Td w={'10vw'}>{server.name}</Table.Td>
                    <Table.Td w={'2vw'}>{server.gamemode}</Table.Td>
                    <Table.Td w={'2vw'}>{server.language}</Table.Td>
                    <Table.Td w={'2vw'} style={{ textAlign: 'right' }}>{server.players}/{server.maxPlayers}</Table.Td>
                </Table.Tr>
            ))}
        </>
    );
}
