import LiveStreamVideo from "../../../components/liveStreamVideo";
import LiveChatBox from "../../../components/liveChatBox";

const StreamingPage = () => {
    return (
            <div className="flex-1 flex flex-col md:flex-row">
                <LiveStreamVideo/>
                <LiveChatBox/>
            </div>
    );

}
export default StreamingPage;
