import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for navigator.mediaDevices and the specific getDisplayMedia method
    const supported = !!(
      navigator.mediaDevices && 
      navigator.mediaDevices.getDisplayMedia
    );
    setIsSupported(supported);
  }, []);

  const handleStart = () => {
    if (isSupported) {
      navigate('/screen-test');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Ref-Desktop-Icon-Path" />
            <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
            <path d="M8 21h8m-4-4v4" strokeWidth={2} />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Screen Share Test App
        </h1>
        <p className="text-slate-600 mb-8">
          This tool verifies your browser's capability to share its screen and displays real-time stream metadata.
        </p>

        {isSupported === false ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm font-medium">
              ⚠️ Browser Not Supported: Your current browser does not support the Screen Capture API. Please try Chrome, Edge, or Firefox on a desktop.
            </p>
          </div>
        ) : (
          <button
            onClick={handleStart}
            disabled={isSupported === null}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSupported === null ? 'Checking Compatibility...' : 'Start Screen Test'}
          </button>
        )}

        <footer className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Secure Context (HTTPS/Localhost) Required
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;