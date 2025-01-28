import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CHOV Social - Intranet",
    description: "Intranet du CHOV",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={frFR}>
            <html lang="fr" className="h-full">
            <body className={`${inter.className} min-h-screen flex flex-col`}>

            <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Navbar />
            </div>

            <div className="flex-grow bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-8">
                {children}
            </div>
            </body>
            </html>
        </ClerkProvider>
    );
}
