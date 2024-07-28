import {Metadata} from 'next';
import {ReactNode} from 'react';

export const metadata: Metadata = {
    title: "Tiny Tails Place",
    description: "Tiny Tails Place",
};

const RootLayout = ({children}: Readonly<{ children: ReactNode }>) => {


    return (
        <div className="min-h-screen bg-[#f0f8f7]">
            {children}
        </div>
    );
};

export default RootLayout;
