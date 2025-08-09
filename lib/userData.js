import { getToken } from './authenticate';

function authHeaders() {
  const t = getToken();
  return t ? { Authorization: 'JWT ' + t } : {};
}

// FAVOURITES
export async function getFavourites() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`, { headers: authHeaders() });
  return r.ok ? r.json() : [];
}
export async function addToFavourites(id) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, { method: 'PUT', headers: authHeaders() });
  return r.ok ? r.json() : [];
}
export async function removeFromFavourites(id) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, { method: 'DELETE', headers: authHeaders() });
  return r.ok ? r.json() : [];
}

// HISTORY
export async function getHistory() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history`, { headers: authHeaders() });
  return r.ok ? r.json() : [];
}
export async function addToHistory(queryString) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${encodeURIComponent(queryString)}`, { method: 'PUT', headers: authHeaders() });
  return r.ok ? r.json() : [];
}
export async function removeFromHistory(queryString) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${encodeURIComponent(queryString)}`, { method: 'DELETE', headers: authHeaders() });
  return r.ok ? r.json() : [];
}
