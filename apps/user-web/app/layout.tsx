import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from '@/lib/utils'

import "./globals.css";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });
const fontHeading = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})

const fontBody = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
})
export const metadata: Metadata = {
  title: "Tiny Tails Place",
  description: "Tiny Tails Place",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'antialiased',
                    fontHeading.variable,
                    fontBody.variable
                )}
            >
             {children}
            </body>
        </html>
    )
}
