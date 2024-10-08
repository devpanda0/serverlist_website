import { NextResponse } from "next/server";
import { getUserLocale } from "@/lib/locale";

export async function GET() {
    const locale = await getUserLocale();
    if (!locale) return NextResponse.json({ error: 'Missing required param: locale' }, { status: 404 })

    return NextResponse.json(locale);
}