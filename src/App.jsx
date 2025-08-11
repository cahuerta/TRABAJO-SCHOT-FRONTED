import React, { useEffect, useState } from 'react'
import { health, crearPaciente, crearTraumatologo, crearMedicoGeneral } from './api'
import FormularioPaciente from './components/FormularioPaciente.jsx'
import EsquemaHumano from './components/EsquemaHumano.jsx'
import FormularioTraumatologo from './components/FormularioTraumatologo.jsx'
import FormularioMedicoGeneral from './components/FormularioMedicoGeneral.jsx'

export default function App() {
  const [status, setStatus] = useState('Comprobando backend…')
  const [form, setForm] = useState({ nombre: '', rut: '', edad: '', dolor: '', lado: '' })
  const BASE = import.meta.env.VITE_BACKEND_BASE

  useEffect(() => {
    health()
      .then(() => setStatus('Backend OK'))
      .catch(() => setStatus('Backend NO disponible'))
  }, [])

  const onPacienteChange = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }))
  const onSeleccionZona = ({ dolor, lado }) => setForm((f) => ({ ...f, dolor, lado }))

  const guardarPaciente = async () => {
    try {
      await crearPaciente(form)
      alert('Paciente guardado')
    } catch (e) {
      alert('Error al guardar paciente: ' + e.message)
    }
  }

  const enviarTrauma = async (payload) => {
    try {
      await crearTraumatologo(payload)
      alert('Registro Traumatólogo guardado')
    } catch (e) {
      alert('Error al guardar traumatólogo: ' + e.message)
    }
  }

  const enviarGeneral = async (payload) => {
    try {
      await crearMedicoGeneral(payload)
      alert('Registro Médico General guardado')
    } catch (e) {
      alert('Error al guardar médico general: ' + e.message)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', fontFamily: 'system-ui, Arial', padding: '0 12px' }}>
      <h1>ICA Forms</h1>
      <p><b>Estado backend:</b> {status}</p>
      <p><b>Backend:</b> {BASE || '(no configurado)'} </p>

      {/* Esquema + Form Paciente */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <h2>Esquema humano</h2>
          <EsquemaHumano onSeleccion={onSeleccionZona} />
          <div style={{ marginTop: 8, fontSize: 14, color: '#333' }}>
            <b>Zona seleccionada:</b> {form.dolor || '—'} {form.lado || ''}
          </div>
        </div>

        <div>
          <h2>Paciente (hoja “Pacientes”)</h2>
          <FormularioPaciente
            data={form}
            onChange={onPacienteChange}
            onGuardar={guardarPaciente}
          />
        </div>
      </div>

      {/* Botones de registros médicos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
        <div>
          <h2>Traumatólogo (hoja “Traumatologo”)</h2>
          <FormularioTraumatologo data={form} onEnviar={enviarTrauma} />
        </div>

        <div>
          <h2>Médico General (hoja “MedicoGeneral”)</h2>
          <FormularioMedicoGeneral data={form} onEnviar={enviarGeneral} />
        </div>
      </div>
    </div>
  )
}
