import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/charts/styles.css';
import { ReactNode } from 'react';
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { getLocale, getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const metadata: Metadata = {
  title: "CP - Serverlist",
  description: "The Serverlist",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
      <html lang={locale}>
      <head>
        <ColorSchemeScript forceColorScheme={"dark"}/>
      </head>
      <body className={inter.className}>
      <MantineProvider forceColorScheme={"dark"} theme={theme}>
        <ModalsProvider>
          <NavigationProgress/>
          <Notifications/>
          <SessionProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
      </body>
      </html>
  )
}