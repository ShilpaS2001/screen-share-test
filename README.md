🖥️ Screen Share Test App

A frontend application that demonstrates browser screen-sharing capabilities using native Web APIs, with clear permission handling, stream lifecycle detection, and proper cleanup.

🔗 Live Demo: https://screen-share-test.vercel.app

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/ShilpaS2001/screen-share-test.git
cd screen-share-test

2. Install dependencies
npm install

3. Run the application locally
npm run dev


Open the app in the browser at:

http://localhost:5173

🔄 Screen-Sharing Flow Explanation
1. Homepage (/)

The app first checks whether the browser supports the Screen Capture API:

navigator.mediaDevices.getDisplayMedia


If unsupported (commonly on mobile browsers), the Start Screen Test button is disabled and an informational message is shown.

If supported, the user can proceed to the screen test page.

2. Screen Test Page (/screen-test)
a. Permission Request

Clicking Start Screen Share triggers:

navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: { ideal: 30 } },
  audio: false
})


The UI enters a requesting permission state while the browser picker is open.

b. Permission Granted

Once the user selects a screen, window, or tab:

A live local preview is displayed in a <video> element.

No recording or backend streaming is performed.

Screen metadata is extracted using:

MediaStreamTrack.getSettings()


and displayed in the UI (resolution, frame rate, display surface when available).

c. Stream Lifecycle Detection

If the user stops sharing via the browser UI, the app detects it using:

track.onended


The UI updates immediately to indicate that screen sharing has stopped.

All media tracks are stopped and the video element is cleared.

d. Retry Flow

After stopping, the user can retry screen sharing.

Each retry starts a fresh getDisplayMedia request.

Old streams are never reused.

🖼️ Screenshots

Add screenshots showing:

<img width="1904" height="1067" alt="image" src="https://github.com/user-attachments/assets/665b90d6-437a-4c4f-904e-444e74c08fe5" />

<img width="1908" height="1071" alt="image" src="https://github.com/user-attachments/assets/5176d1d0-4b26-49e4-894a-88a801d60636" />

<img width="1907" height="1079" alt="image" src="https://github.com/user-attachments/assets/7ebdc99c-feef-4ee9-a5c0-61727b4ba1ec" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c18496a4-e2f7-4f8f-b203-73eaaa2cfb6f" />

<img width="714" height="1599" alt="image" src="https://github.com/user-attachments/assets/52d5331e-e0b7-46ad-86b1-808149607c75" />



⚠️ Known Limitations & Browser Quirks

Screen sharing is supported only on desktop Chrome and Edge.

Most mobile browsers do not support the Screen Capture API due to platform security restrictions.

Chrome reports both picker cancellation and permission denial as NotAllowedError, so these states cannot always be distinguished reliably.

The displaySurface property is not available in all browsers.

When Picture-in-Picture (PiP) mode is enabled, the browser moves video rendering to the PiP window and inline preview pauses by design. This is expected Chromium behavior.
