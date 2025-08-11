// src/api.js
export const BACKEND_BASE =
  import.meta.env.VITE_BACKEND_BASE || 'http://localhost:3001';

/**
 * Hace una petición JSON con timeout y manejo de errores.
 * Retorna el JSON ya parseado si todo sale bien.
 */
async function request(path, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000); // 20s

  const res = await fetch(`${BACKEND_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
  }).catch((e) => {
    throw new Error(e.name === 'AbortError' ? 'Tiempo de espera agotado' : e.message);
  });

  clearTimeout(id);

  let json = {};
  try {
    json = await res.json();
  } catch {
    // si no hay JSON, dejamos {}
  }

  if (!res.ok || json?.ok === false) {
    throw new Error(json?.error || `Error HTTP ${res.status}`);
  }

  return json;
}

export function postJSON(path, payload) {
  return request(path, { method: 'POST', body: payload });
}

export function getJSON(path) {
  return request(path, { method: 'GET' });
}
