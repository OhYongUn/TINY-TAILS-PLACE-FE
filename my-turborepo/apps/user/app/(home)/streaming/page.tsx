import LiveStreamVideo from "@user/components/liveStreamVideo";
import LiveChatBox from "@user/components/liveChatBox";

const StreamingPage = () => {
    return (
            <div className="flex-1 flex flex-col md:flex-row">
                <LiveStreamVideo/>
                <LiveChatBox/>
            </div>
    );

}
export default StreamingPage;
