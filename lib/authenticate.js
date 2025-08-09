const TOKEN_KEY = 'token';

export function setToken(token) {
  if (typeof window === 'undefined') return; // SSR guard
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  if (typeof window === 'undefined') return null; // SSR guard
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window === 'undefined') return; // SSR guard
  localStorage.removeItem(TOKEN_KEY);
}

export function readToken() {
  const t = getToken();
  if (!t) return null;
  try { return JSON.parse(atob(t.split('.')[1])); } catch { return null; }
}

export function isAuthenticated() {
  // Uses getToken(), which is SSR-safe now
  return !!getToken();
}

export async function authenticateUser(userName, password) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  });
  const data = await r.json();
  if (!r.ok || !data.token) throw new Error(data.message || 'Login failed');
  setToken(data.token);
  return true;
}

export async function registerUser(userName, password, password2) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password, password2 })
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.message || 'Register failed');
  return true;
}
