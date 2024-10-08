"use client";

import CpNavigation from "@/components/navigation/CpNavigation";
import {useSession} from "next-auth/react";
import {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
    useSession({ required: true, onUnauthenticated: () => ({ redirectTo: '/' }) });

    return (
        <CpNavigation>{children}</CpNavigation>
    );
}