"use client"
import {UsersIcon} from "@user/components/icons/icons";

const StreamingHeader = () => {
    return (
        <header className="bg-background border-b flex items-center justify-between px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
                <img src="/placeholder.svg" width={40} height={40} alt="Streamer Avatar" className="rounded-full"/>
                <div className="text-lg font-semibold">Acme Streamer</div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <UsersIcon className="w-5 h-5"/>
                <div>1,234 viewers</div>
            </div>
        </header>
    )

}

export default StreamingHeader;
