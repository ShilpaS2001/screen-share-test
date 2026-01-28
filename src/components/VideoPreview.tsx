import React, { useRef, useEffect } from 'react';

interface VideoPreviewProps {
  stream: MediaStream | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.srcObject = stream;
    }

    // This cleanup runs when 'stream' changes to null OR component unmounts
    return () => {
      if (videoElement) {
        // 1. Force the browser to exit Picture-in-Picture mode
        if (document.pictureInPictureElement === videoElement) {
          document.exitPictureInPicture().catch((err) => {
            console.error("Failed to exit PiP:", err);
          });
        }
        
        // 2. Clear the source and reset the video element
        videoElement.srcObject = null;
        videoElement.load(); 
      }
    };
  }, [stream]);

  if (!stream) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-contain bg-black"
    />
  );
};

export default VideoPreview;