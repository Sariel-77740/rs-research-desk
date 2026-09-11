import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/providers";

export const metadata: Metadata = { title: "RS Research Desk", description: "A personal research workspace for remote sensing foundation models." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN" suppressHydrationWarning><body><Providers><AppShell>{children}</AppShell></Providers></body></html>; }
