// app/(home)/streaming/layout.tsx
import {ReactNode} from "react";
import StreamingHeader from "../../../components/streamingHeader";

const StreamingLayout = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <div className="flex flex-col h-screen">
            <StreamingHeader/>
            <main className="flex flex-col items-center p-4 md:flex-row md:justify-between md:p-8">
                {children}
            </main>
        </div>
    )
}

export default StreamingLayout;
