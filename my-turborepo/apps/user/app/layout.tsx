import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {cn} from "@user/components/utils";

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

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
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
