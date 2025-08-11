import React, { useEffect, useState } from 'react'
import { health, crearPaciente, crearTraumatologo, crearMedicoGeneral } from './api'
import FormularioPaciente from './components/FormularioPaciente.jsx'
import EsquemaHumanoSVG from './components/EsquemaHumanoSVG.jsx'
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

  // Tu EsquemaHumanoSVG entrega strings como "Cadera izquierda"
  const onSeleccionZona = (zona) => {
    const z = (zona || '').toLowerCase()
    if (z === 'columna lumbar') {
      setForm((f) => ({ ...f, dolor: 'Columna lumbar', lado: '' }))
    } else if (z === 'cadera izquierda') {
      setForm((f) => ({ ...f, dolor: 'Cadera', lado: 'Izquierda' }))
    } else if (z === 'cadera derecha') {
      setForm((f) => ({ ...f, dolor: 'Cadera', lado: 'Derecha' }))
    } else if (z === 'rodilla izquierda') {
      setForm((f) => ({ ...f, dolor: 'Rodilla', lado: 'Izquierda' }))
    } else if (z === 'rodilla derecha') {
      setForm((f) => ({ ...f, dolor: 'Rodilla', lado: 'Derecha' }))
    }
  }

  const onPacienteChange = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }))

  const guardarPaciente = async () => {
    await crearPaciente(form)
  }

  const enviarTrauma = async (payload) => {
    await crearTraumatologo(payload)
  }

  const enviarGeneral = async (payload) => {
    await crearMedicoGeneral(payload)
  }

  return (
    <div style={{ maxWidth: 1000, margin: '32px auto', fontFamily: 'system-ui, Arial', padding: '0 12px' }}>
      <h1>ICA Forms</h1>
      <p><b>Estado backend:</b> {status}</p>
      <p><b>Backend:</b> {BASE || '(no configurado)'} </p>

      {/* Esquema + Form Paciente (tu diseño) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <EsquemaHumanoSVG onSeleccionZona={onSeleccionZona} />
          <div style={{ marginTop: 8, fontSize: 14, color: '#333' }}>
            <b>Zona seleccionada:</b> {form.dolor || '—'} {form.lado || ''}
          </div>
        </div>

        <div>
          <FormularioPaciente
            datos={form}
            onCambiarDato={onPacienteChange}
            onSubmit={(e) => {
              e.preventDefault()
              guardarPaciente()
                .then(() => alert('Paciente guardado'))
                .catch((err) => alert('Error al guardar paciente: ' + err.message))
            }}
          />
        </div>
      </div>

      {/* Tarjetas con el mismo look & feel que tu formulario */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
        <FormularioTraumatologo
          data={form}
          onEnviar={(payload) =>
            enviarTrauma(payload)
              .then(() => alert('Registro Traumatólogo guardado'))
              .catch((e) => alert('Error al guardar traumatólogo: ' + e.message))
          }
        />

        <FormularioMedicoGeneral
          data={form}
          onEnviar={(payload) =>
            enviarGeneral(payload)
              .then(() => alert('Registro Médico General guardado'))
              .catch((e) => alert('Error al guardar médico general: ' + e.message))
          }
        />
      </div>
    </div>
  )
}
