import React from 'react';
import type { ShareStatus } from '../hooks/useScreenShare';

interface StatusBadgeProps {
  status: ShareStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    idle: { label: 'Ready', color: 'bg-slate-100 text-slate-600 border-slate-200' },
    requesting: { label: 'Selecting...', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse' },
    active: { label: 'Live Sharing', color: 'bg-green-100 text-green-700 border-green-200' },
    denied: { label: 'Permission Denied', color: 'bg-red-100 text-red-700 border-red-200' },
    canceled: { label: 'Cancelled', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    error: { label: 'Error', color: 'bg-red-600 text-white border-red-700' },
    stopped: { label: 'Stream Ended', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  };

  const { label, color } = config[status];

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${color}`}>
      <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500 animate-ping' : 'bg-current opacity-30'}`} />
      {label}
    </div>
  );
};

export default StatusBadge;