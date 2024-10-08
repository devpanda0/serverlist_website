"use client";

import { IconSquareRoundedCheck, IconSquareRoundedX } from "@tabler/icons-react";

export default function StatusIcon({ status }: { status: boolean }) {
    return status ? <IconSquareRoundedCheck color={'green'} /> : <IconSquareRoundedX color={'red'} />;
}