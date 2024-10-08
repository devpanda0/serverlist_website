import { ReactNode } from "react";
import Navigation from "@/components/navigation/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Navigation>{children}</Navigation>
    );
}