import localListing from '../data/listing.json';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Tries the Express API first; falls back to the bundled mock JSON so the
// UI still works standalone (e.g. static hosting on Vercel with no backend).
export async function fetchListing(id = 'mirashya-ug10') {
  try {
    const res = await fetch(`${API_BASE}/api/listing/${id}`, { signal: AbortSignal.timeout(1500) });
    if (!res.ok) throw new Error('bad response');
    return await res.json();
  } catch {
    return localListing;
  }
}
