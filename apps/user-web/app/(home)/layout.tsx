import { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";


export const metadata: Metadata = {
    title: "Tiny Tails Place",
    description: "Tiny Tails Place",
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
    return (
        <div className="min-h-screen bg-[#f0f8f7]">
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default RootLayout;
