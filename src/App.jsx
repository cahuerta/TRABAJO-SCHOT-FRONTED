import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { health, crearPaciente, crearTraumatologo, crearMedicoGeneral } from './api'
import FormularioPaciente from './components/FormularioPaciente.jsx'
import EsquemaHumanoSVG from './components/EsquemaHumanoSVG.jsx'
import FormularioTraumatologo from './components/FormularioTraumatologo.jsx'
import FormularioMedicoGeneral from './components/FormularioMedicoGeneral.jsx'

export default function App() {
  // estado global para que los datos persistan al cambiar de página
  const [status, setStatus] = useState('Comprobando backend…')
  const [form, setForm] = useState({ nombre: '', rut: '', edad: '', dolor: '', lado: '' })
  const BASE = import.meta.env.VITE_BACKEND_BASE

  useEffect(() => {
    health().then(() => setStatus('Backend OK')).catch(() => setStatus('Backend NO disponible'))
  }, [])

  // === helpers de datos compartidos ===
  const onPacienteChange = (campo, valor) => setForm(f => ({ ...f, [campo]: valor }))

  // tu SVG emite strings tipo "Cadera izquierda"
  const onSeleccionZona = (zona) => {
    const z = (zona || '').toLowerCase()
    if (z === 'columna lumbar') setForm(f => ({ ...f, dolor: 'Columna lumbar', lado: '' }))
    if (z === 'cadera izquierda') setForm(f => ({ ...f, dolor: 'Cadera', lado: 'Izquierda' }))
    if (z === 'cadera derecha') setForm(f => ({ ...f, dolor: 'Cadera', lado: 'Derecha' }))
    if (z === 'rodilla izquierda') setForm(f => ({ ...f, dolor: 'Rodilla', lado: 'Izquierda' }))
    if (z === 'rodilla derecha') setForm(f => ({ ...f, dolor: 'Rodilla', lado: 'Derecha' }))
  }

  // === llamadas backend ===
  const guardarPaciente = async () => { await crearPaciente(form) }
  const enviarTrauma = async (payload) => { await crearTraumatologo(payload) }
  const enviarGeneral = async (payload) => { await crearMedicoGeneral(payload) }

  return (
    <Routes>
      {/* ---------------- HOME: SOLO 3 BOTONES ---------------- */}
      <Route path="/" element={
        <div style={styles.wrap}>
          <header style={{ marginBottom: 20 }}>
            <h1 style={{ margin: 0 }}>ICA Forms</h1>
            <div style={{ color: '#445' }}>
              <b>Estado backend:</b> {status} · <b>Backend:</b> {BASE || '(no configurado)'}
            </div>
          </header>

          <div style={styles.cardRow}>
            <Link to="/paciente" style={styles.bigBtn}>Paciente</Link>
            <Link to="/traumatologo" style={styles.bigBtn}>Traumatólogo</Link>
            <Link to="/medico-general" style={styles.bigBtn}>Médico General</Link>
          </div>
        </div>
      } />

      {/* ---------------- PÁGINA: PACIENTE ---------------- */}
      <Route path="/paciente" element={
        <div style={styles.wrap}>
          <NavBar />
          <div style={styles.grid}>
            <div>
              <EsquemaHumanoSVG onSeleccionZona={onSeleccionZona} />
              <div style={styles.zona}>
                <b>Zona:</b> {form.dolor || '—'} {form.lado || ''}
              </div>
            </div>

            <FormularioPaciente
              datos={form}
              onCambiarDato={onPacienteChange}
              onSubmit={(e) => {
                e.preventDefault()
                guardarPaciente()
                  .then(() => alert('Paciente guardado'))
                  .catch(err => alert('Error al guardar paciente: ' + err.message))
              }}
            />
          </div>
        </div>
      } />

      {/* ---------------- PÁGINA: TRAUMATOLOGO ---------------- */}
      <Route path="/traumatologo" element={
        <div style={styles.wrap}>
          <NavBar />
          <div style={styles.grid}>
            <div>
              <EsquemaHumanoSVG onSeleccionZona={onSeleccionZona} />
              <div style={styles.zona}>
                <b>Zona:</b> {form.dolor || '—'} {form.lado || ''}
              </div>
            </div>

            <FormularioTraumatologo
              data={form}
              onEnviar={(payload) =>
                enviarTrauma(payload)
                  .then(() => alert('Registro Traumatólogo guardado'))
                  .catch(e => alert('Error al guardar traumatólogo: ' + e.message))
              }
            />
          </div>
        </div>
      } />

      {/* ---------------- PÁGINA: MÉDICO GENERAL ---------------- */}
      <Route path="/medico-general" element={
        <div style={styles.wrap}>
          <NavBar />
          <div style={styles.grid}>
            <div>
              <EsquemaHumanoSVG onSeleccionZona={onSeleccionZona} />
              <div style={styles.zona}>
                <b>Zona:</b> {form.dolor || '—'} {form.lado || ''}
              </div>
            </div>

            <FormularioMedicoGeneral
              data={form}
              onEnviar={(payload) =>
                enviarGeneral(payload)
                  .then(() => alert('Registro Médico General guardado'))
                  .catch(e => alert('Error al guardar médico general: ' + e.message))
              }
            />
          </div>
        </div>
      } />
    </Routes>
  )
}

function NavBar() {
  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
      <Link to="/" style={styles.linkBack}>← Volver</Link>
    </div>
  )
}

const styles = {
  wrap: { maxWidth: 1100, margin: '32px auto', padding: '0 12px', fontFamily: 'system-ui, Arial' },
  cardRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
    gap: 16,
    marginTop: 24
  },
  bigBtn: {
    display: 'grid',
    placeItems: 'center',
    padding: '28px 12px',
    background: '#fff',
    border: '1px solid #cdd6e6',
    borderRadius: 10,
    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
    textDecoration: 'none',
    color: '#0d2a58',
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer'
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' },
  zona: { marginTop: 8, fontSize: 14, color: '#333' },
  linkBack: {
    textDecoration: 'none',
    color: '#0d2a58',
    background: '#e9f1ff',
    border: '1px solid #cdd6e6',
    padding: '8px 12px',
    borderRadius: 8,
    fontWeight: 600
  }
}
