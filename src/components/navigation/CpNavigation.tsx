"use client";
import navigationCss from './cpNavigation.module.css';
import { AppShell, Avatar, Box, Button, Group, Menu, Text, Title, UnstyledButton } from '@mantine/core';
import { IconCheck, IconLogout, IconRefresh, } from "@tabler/icons-react";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { signIn, signOut, useSession } from "next-auth/react";
import { Locale } from "@/app/config";
import { setUserLocale } from "@/lib/locale";
import { ApiCall } from "@/lib/ApiCall";
import Flag from 'react-world-flags';
import NotifyService from '@/lib/NotifyService';

export default function CpNavigation({ children }: { children: ReactNode }) {
    const notify = new NotifyService("System");
    const session = useSession();
    const pathname = usePathname()
    const t = useTranslations("CpNavigation");
    const [isPending, startTransition] = useTransition();
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        fetchLocale();
    }, []);

    const fetchLocale = async () => {
        const res = await ApiCall('GET', '/v1/utils/locale', {});
        if (!res) {
            notify.error("Failed to fetch locale");
            return;
        }
        setLocale(res as Locale);
    }

    const onChange = (value: string) => {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
        setLocale(locale);
    }

    const logout = async () => {
        await signOut({ callbackUrl: '/' });
    }

    const refreshSession = async () => {
        await signIn('discord', { callbackUrl: pathname });
    }

    const isSelectedLanguage = (code: string) => {
        if (locale === code) {
            return <IconCheck/>
        }
    }

    return (
        <AppShell
            header={{ height: { base: 60, md: 70 } }} p={"md"}
            navbar={{ width: 300, breakpoint: 'sm' }}
        >
            <AppShell.Header>
                <Group gap={5} h="100%" px="md" justify={'space-between'}>
                    <Link href={'/cp/dashboard'} passHref>
                        <Title order={2} c={'white'}>SERVERLIST</Title>
                    </Link>
                    <Group>
                        <Button c={'white'} variant={'outline'} href={'/cp/groups'} component={Link}
                                styles={{ root: { borderColor: 'white' } }}>Groups</Button>
                        <Button c={'white'} variant={'outline'} href={'/cp/servers'} component={Link}
                                styles={{ root: { borderColor: 'white' } }}>Servers</Button>
                        <Button c={'white'} variant={'outline'} href={'/cp/tokens'} component={Link}
                                styles={{ root: { borderColor: 'white' } }}>API-Tokens</Button>
                    </Group>
                    <Box>
                        {session.data?.user && (
                            <Menu shadow={"md"} width={200} withArrow>
                                <Menu.Target>
                                    <UnstyledButton className={navigationCss.user}>
                                        <Group>
                                            <Avatar src={session.data!.user!.image} radius="xl"/>

                                            <div style={{ flex: 1 }}>
                                                <Text size="sm" fw={500} c={'white'}>
                                                    {session.data!.user!.name}
                                                </Text>

                                                <Text c={session.data!.user!.roleColor ?? "dimmed"} size={"xs"}>
                                                    {session.data!.user!.roleName}
                                                </Text>
                                            </div>
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Label>Languages</Menu.Label>
                                    <Menu.Item
                                        onClick={() => onChange('de')}
                                        leftSection={<Flag code={"DE"}/>} rightSection={isSelectedLanguage("de")}
                                    >
                                        German
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => onChange('en')}
                                        leftSection={<Flag code={"US"}/>} rightSection={isSelectedLanguage("en")}
                                    >
                                        English
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => onChange('fr')}
                                        leftSection={<Flag code={"FR"}/>} rightSection={isSelectedLanguage("fr")}
                                    >
                                        France
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => onChange('ru')}
                                        leftSection={<Flag code={"RU"}/>} rightSection={isSelectedLanguage("ru")}
                                    >
                                        Russian
                                    </Menu.Item>

                                    <Menu.Divider/>

                                    <Menu.Item onClick={refreshSession} leftSection={<IconRefresh/>}>Session</Menu.Item>
                                    <Menu.Item onClick={logout} leftSection={<IconLogout/>}>Logout</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Box>
                </Group>
            </AppShell.Header>
            <AppShell.Main mih={"96dvh"}>{children}</AppShell.Main>
        </AppShell>
    )
}
