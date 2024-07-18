import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {
    CalendarIcon,
    CreditCardIcon,
    HomeIcon,
    PawPrintIcon,
    PlayIcon,
    SlashIcon,
    UsersIcon
} from "@/_components/icons";

const StreamingPage = () => {
    return (
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="flex-1 bg-muted overflow-hidden relative order-2 md:order-1">
                    <video
                        className="w-full h-full object-cover"
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        controls
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold">Acme Streamer</div>
                            <div className="flex items-center gap-2 text-sm">
                                <UsersIcon className="w-4 h-4"/>
                                <div>1,234 viewers</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted border-l w-full md:w-80 flex flex-col order-1 md:order-2">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                                 className="rounded-full"/>
                            <div>
                                <div className="font-medium">John Doe</div>
                                <div className="text-sm text-muted-foreground">Hey, great stream!</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                                 className="rounded-full"/>
                            <div>
                                <div className="font-medium">Jane Smith</div>
                                <div className="text-sm text-muted-foreground">Loving the content!</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                                 className="rounded-full"/>
                            <div>
                                <div className="font-medium">Bob Johnson</div>
                                <div className="text-sm text-muted-foreground">Keep it up!</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t p-4">
                        <form className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Send a message..."
                                className="flex-1 bg-background rounded-md px-3 py-2 text-sm"
                            />
                            <Button type="submit" variant="outline">
                                Send
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
    );

}
export default StreamingPage;
