import LiveStreamVideo from '../../../components/liveStreamVideo';
import LiveChatBox from '../../../components/liveChatBox';

const StreamingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center p-4 md:flex-row md:justify-between md:p-8">
        <div className="flex-1 flex flex-col md:flex-row">
          <LiveStreamVideo />
          <LiveChatBox />
        </div>
      </main>
    </div>
  );
};
export default StreamingPage;
