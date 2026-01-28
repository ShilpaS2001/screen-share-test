import { useState, useCallback, useEffect, useRef } from 'react';

export type ShareStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'canceled' | 'error' | 'stopped';

interface ScreenMetadata {
  resolution: string;
  displaySurface: string;
}

export const useScreenShare = () => {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [metadata, setMetadata] = useState<ScreenMetadata | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Ref is used to track the stream for immediate cleanup during unmount
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(async () => {
    // 1. Force exit Picture-in-Picture if it's active
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture().catch(() => {});
    }

    // 2. Kill the hardware tracks via Ref (synchronous access)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        track.onended = null;
      });
      streamRef.current = null;
    }
    
    // 3. Update React state
    setStream(null);
    setMetadata(null);
    setStatus('stopped');
  }, []);

  const startShare = async () => {
    setStatus('requesting');
    setErrorMessage('');

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      const track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();

      setMetadata({
        resolution: `${settings.width}x${settings.height}`,
        displaySurface: (settings as any).displaySurface || 'browser',
      });

      // Handle the browser's native "Stop Sharing" button
      track.onended = () => stopStream();

      // Keep ref and state in sync
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setStatus('active');
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setStatus('denied');
        setErrorMessage('Permission was denied.');
      } else {
        setStatus('error');
        setErrorMessage(err.message || 'Unknown error occurred.');
      }
    }
  };

  // Immediate cleanup when navigating away (Back to Dashboard)
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []); // Only run on mount/unmount

  return { stream, status, metadata, errorMessage, startShare, stopStream };
};