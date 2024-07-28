const LiveStreamVideo = () => {

    return (
        <div className="flex-1 bg-muted overflow-hidden relative order-2 md:order-1">
            <video
                className="w-full h-full object-cover"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
            />
        </div>
    )
}

export default LiveStreamVideo;
