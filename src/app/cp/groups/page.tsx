"use client";

import { Center, Flex, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { ServerGroup } from "@/types/general";
import { getGroups } from "@/app/cp/groups/actions";
import TableButton from "@/components/TableButton";

export default function Page() {
    const [groups, setGroups] = useState<ServerGroup[]>([]);

    useEffect(() => {
        fetchGroups()
    }, []);

    const fetchGroups = async () => {
        const groups = await getGroups();
        setGroups(groups as any);
    }

    const deleteServerGroup = async (id: string) => {

        fetchGroups();
    }

    return (
        <Center w={'100%'}>
            <Table.ScrollContainer minWidth={'20dvw'} w={'35dvw'}>
                <Table stickyHeader highlightOnHover withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={'5rem'}>Name</Table.Th>
                            <Table.Th w={'1rem'} style={{textAlign: 'right'}}>Servers</Table.Th>
                            <Table.Th w={'2rem'}></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {groups.map(group => (
                            <Table.Tr key={group.id}>
                                <Table.Td w={'5rem'}>{group.name}</Table.Td>
                                <Table.Td w={'1rem'} style={{textAlign: 'right'}}>{group.servers.length}</Table.Td>
                                <Table.Td w={'2rem'}>
                                    <Flex align={'center'} justify={'flex-end'} gap={5}>
                                        <TableButton type={'edit'} href={`${group.id}`} />
                                        <TableButton type={'delete'} onClick={() => deleteServerGroup(group.id)} />
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Center>
    );
}