import React from 'react';
import { useOffline } from '../contexts/OfflineContext';

function OfflineIndicator() {
  const { isOffline } = useOffline();

  if (!isOffline) return null;

  return (
    <div className="offline-indicator show">
      You are currently offline. Some features may not be available.
    </div>
  );
}

export default OfflineIndicator;