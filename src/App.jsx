import React, { useEffect, useState } from 'react'
import { health, crearPaciente, crearTraumatologo, crearMedicoGeneral } from './api'

export default function App() {
  const [status, setStatus] = useState('Comprobando backend…')
  const [form, setForm] = useState({ nombre: '', rut: '', edad: '', dolor: '', lado: '' })
  const BASE = import.meta.env.VITE_BACKEND_BASE

  useEffect(() => {
    health().then(() => setStatus('Backend OK')).catch(() => setStatus('Backend NO disponible'))
  }, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui, Arial' }}>
      <h1>ICA Forms</h1>
      <p><b>Estado:</b> {status}</p>
      <p><b>Backend:</b> {BASE || '(no configurado)'}</p>

      <h2>Paciente (hoja “Pacientes”)</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} />
        <input name="rut" placeholder="RUT" value={form.rut} onChange={onChange} />
        <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={onChange} />
        <input name="dolor" placeholder="Dolor (ej: Rodilla)" value={form.dolor} onChange={onChange} />
        <input name="lado" placeholder="Lado (Derecha/Izquierda)" value={form.lado} onChange={onChange} />
        <button onClick={async () => { await crearPaciente({ ...form }); alert('Paciente guardado'); }}>
          Guardar Paciente
        </button>
      </div>

      <h2 style={{ marginTop: 32 }}>Traumatólogo (hoja “Traumatologo”)</h2>
      <button onClick={async () => {
        await crearTraumatologo({
          pacienteNombre: form.nombre,
          rut: form.rut,
          edad: form.edad,
          examenSolicitado: form.dolor ? `Estudio de ${form.dolor} ${form.lado}` : 'Estudio',
          nombreMedico: 'Dr. Cristóbal Huerta'
        })
        alert('Registro Traumatólogo guardado')
      }}>
        Guardar Traumatólogo
      </button>

      <h2 style={{ marginTop: 32 }}>Médico General (hoja “MedicoGeneral”)</h2>
      <button onClick={async () => {
        await crearMedicoGeneral({
          pacienteNombre: form.nombre,
          rut: form.rut,
          edad: form.edad,
          examenSolicitado: 'Radiografía de tórax',
          nombreMedico: 'Dra. General'
        })
        alert('Registro Médico General guardado')
      }}>
        Guardar Médico General
      </button>
    </div>
  )
}
