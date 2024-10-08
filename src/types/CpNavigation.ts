import React from "react"

export type NavItem = {
    name: string,
    url?: string,
    icon?: React.ReactNode,
    sort: number,
    open?: boolean,
    children?: NavItem[]
}