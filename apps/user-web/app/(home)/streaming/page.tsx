import LiveStreamVideo from "@/app/(home)/_compontents/liveStreamVideo";
import LiveChatBox from "@/app/(home)/_compontents/liveChatBox";

const StreamingPage = () => {
    return (
            <div className="flex-1 flex flex-col md:flex-row">
                <LiveStreamVideo/>
                <LiveChatBox/>
            </div>
    );

}
export default StreamingPage;
