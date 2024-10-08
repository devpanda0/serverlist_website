"use client";

import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import { IconEdit, IconHomeShare, IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";

interface TableButtonProps {
    type: "info" | "edit" | "add" | "connect" | "delete";
    href?: string;
    onClick?: () => void;
}

export default function TableButton({ type, href, onClick }: TableButtonProps) {
    const colors = {
        info: "blue",
        edit: "orange",
        add: "green",
        connect: "purple",
        delete: "red",
    };

    const icons = {
        info: <IconInfoCircle size={26} />,
        edit: <IconEdit size={26} />,
        add: <IconPlus size={26} />,
        connect: <IconHomeShare size={26} />,
        delete: <IconTrash size={26} />,
    };

    if (!href && !onClick) return null;

    const actionIcon = (
        <ActionIcon bg={colors[type]} onClick={onClick}>
            {icons[type]}
        </ActionIcon>
    );

    return href ? <Link href={href}>{actionIcon}</Link> : actionIcon;
}
