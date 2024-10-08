import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './NotFound.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFoundTitle() {
    const t = useTranslations("ErrorPages");

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>{t("404.title")}</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                {t("404.message")}
            </Text>
            <Group justify="center">
                <Link href={'/dashboard'}>
                    <Button variant="subtle" size="md">
                        {t("backToDashboard")}
                    </Button>
                </Link>
            </Group>
        </Container>
    );
}