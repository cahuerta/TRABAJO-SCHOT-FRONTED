const BASE = import.meta.env.VITE_BACKEND_BASE || 'http://localhost:3001'

async function req(path, options = {}) {
  const r = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok || j?.ok === false) throw new Error(j?.error || `HTTP ${r.status}`)
  return j
}

export const health = () => req('/health')
export const crearPaciente = (payload) =>
  req('/api/pacientes', { method: 'POST', body: JSON.stringify(payload) })
export const crearTraumatologo = (payload) =>
  req('/api/traumatologo', { method: 'POST', body: JSON.stringify(payload) })
export const crearMedicoGeneral = (payload) =>
  req('/api/medico-general', { method: 'POST', body: JSON.stringify(payload) })
