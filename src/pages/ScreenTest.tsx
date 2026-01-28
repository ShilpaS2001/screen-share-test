import React from 'react';
import { Link } from 'react-router-dom';
import { useScreenShare } from '../hooks/useScreenShare';
import Button from '../components/Button';
import VideoPreview from '../components/VideoPreview';
import StatusBadge from '../components/StatusBadge';

const ScreenTest: React.FC = () => {
  const { stream, status, metadata, errorMessage, startShare, stopStream } = useScreenShare();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 animate-in fade-in duration-500">
      {/* Top Navigation / Breadcrumb */}
      <nav className="mb-8">
        <Link 
          to="/" 
          className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          Back to Dashboard
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Feed (8/12 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 rounded-3xl aspect-video shadow-2xl overflow-hidden border border-slate-800 flex items-center justify-center relative group">
            
            {/* Custom Shimmer Effect for Requesting State */}
            {status === 'requesting' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] z-10" />
            )}

            {status === 'active' ? (
              <VideoPreview stream={stream} />
            ) : (
              <div className="text-center p-6 transition-all duration-300">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                   <span className="text-3xl animate-bounce">📺</span>
                </div>
                <p className="text-slate-400 font-medium tracking-wide">
                  {status === 'requesting' ? 'Opening System Picker...' : 'No Active Feed'}
                </p>
                {status === 'idle' && (
                  <p className="text-slate-600 text-sm mt-2 font-light">Click the button to start the test</p>
                )}
              </div>
            )}
            
            {/* Live Indicator Overlay (Custom Pulse Animation) */}
            {status === 'active' && (
              <div className="absolute top-6 left-6 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl z-20">
                <div className="relative flex h-3 w-3">
                  <span className="animate-recording absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  Live Preview
                </span>
              </div>
            )}
          </div>
          
          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl text-sm flex items-start gap-3 animate-in slide-in-from-left-2">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="font-bold">Permission Error</p>
                <p className="opacity-80">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Controls & Data (4/12 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              Diagnostic Data
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">System Status</label>
                <StatusBadge status={status} />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <DataPoint 
                  label="Display Source" 
                  value={metadata?.displaySurface} 
                  fallback="None Detected"
                />
                <DataPoint 
                  label="Active Resolution" 
                  value={metadata?.resolution} 
                  fallback="0 x 0"
                />
                <DataPoint 
                  label="Target Frame Rate" 
                  value={status === 'active' ? '30 FPS' : undefined} 
                  fallback="N/A"
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            {status !== 'active' ? (
              <Button 
                onClick={startShare} 
                isLoading={status === 'requesting'}
                className="w-full py-5 text-lg rounded-2xl transition-all active:scale-95"
              >
                {status === 'stopped' || status === 'denied' ? 'Retry Test' : 'Begin Screen Test'}
              </Button>
            ) : (
              <Button 
                variant="danger" 
                onClick={stopStream}
                className="w-full py-5 text-lg rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-100"
              >
                Stop Sharing
              </Button>
            )}
            
            <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed">
              Your browser may prompt you to select a specific tab, window, or your entire screen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// Polished helper component for metadata rows
const DataPoint = ({ label, value, fallback }: { label: string; value?: string; fallback: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
    <span className={`font-mono text-sm font-bold ${value ? 'text-blue-600' : 'text-slate-300'}`}>
      {value || fallback}
    </span>
  </div>
);

export default ScreenTest;