// src/utils/analytics.js
const API_URL = "https://toto-backend-bw80.onrender.com/api/v1/analytics";
// import.meta.env.VITE_API_URL || 


export async function recordVisit(userId, page) {
  try {
    await fetch(`${API_URL}/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        page,
        device: navigator.userAgent,
        browser: navigator.vendor || "Unknown",
      }),
    });
  } catch (err) {
    console.warn("Failed to record visit:", err);
  }
}

export async function recordInstall(userId) {
  try {
    await fetch(`${API_URL}/install`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        device: navigator.userAgent,
        browser: navigator.vendor || "Unknown",
      }),
    });
  } catch (err) {
    console.warn("Failed to record install:", err);
  }
}
