export async function recordVisit(userId, page) {
    try {
      await fetch('/api/v1/analytics/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page,
          device: /Mobi/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent
        })
      });
    } catch (err) {
      console.error('Failed to record visit', err);
    }
  }
  
  export async function recordInstall(userId) {
    try {
      await fetch('/api/v1/analytics/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          device: /Mobi/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent
        })
      });
    } catch (err) {
      console.error('Failed to record install', err);
    }
  }
  