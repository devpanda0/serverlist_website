"use client";

import { AppShell, Box, Button, Group, Title } from "@mantine/core";
import { ReactNode } from "react";
import { signIn } from "next-auth/react";

export default function Navigation({ children }: { children: ReactNode }) {

    const login = () => {
        signIn('discord', { callbackUrl: '/cp' });
    }

    return (
        <AppShell header={{ height: 60, collapsed: false }}>
            <AppShell.Header>
                <Group justify={'space-between'} h="100%" px="md">
                    <Box>
                        <Title>SERVERLIST</Title>
                    </Box>
                    <Box>
                        <Button onClick={login}>Login</Button>
                    </Box>
                </Group>
            </AppShell.Header>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}