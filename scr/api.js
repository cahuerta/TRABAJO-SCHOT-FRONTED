// Ajusta esta URL a tu backend (Render, Railway, VPS, etc.)
export const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE || 'http://localhost:3001';

export async function postJSON(path, payload) {
  const r = await fetch(`${BACKEND_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error || 'Error guardando datos');
  return j;
}
