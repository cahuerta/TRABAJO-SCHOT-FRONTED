import React, { useState } from 'react'

/**
 * Formulario para registrar orden de Médico General.
 * Usa los datos del paciente (data) y permite editar:
 *  - examenSolicitado
 *  - nombreMedico
 *
 * onEnviar(payload) debe enviar al backend:
 * {
 *   pacienteNombre, rut, edad, examenSolicitado, nombreMedico
 * }
 * La especialidad la fija el backend como "Medicina general".
 */
export default function FormularioMedicoGeneral({ data, onEnviar }) {
  const [examenSolicitado, setExamenSolicitado] = useState('Radiografía de tórax')
  const [nombreMedico, setNombreMedico] = useState('Médico General')

  const enviar = () => {
    if (!data?.nombre || !data?.rut || !data?.edad) {
      alert('Completa los datos del paciente antes de enviar.')
      return
    }
    if (!examenSolicitado) {
      alert('Escribe el examen solicitado.')
      return
    }
    onEnviar?.({
      pacienteNombre: data.nombre,
      rut: data.rut,
      edad: data.edad,
      examenSolicitado,
      nombreMedico
    })
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label>
        Examen solicitado
        <input
          placeholder="Ej: Radiografía de tórax / Hemograma / etc."
          value={examenSolicitado}
          onChange={(e) => setExamenSolicitado(e.target.value)}
        />
      </label>

      <label>
        Nombre médico
        <input
          value={nombreMedico}
          onChange={(e) => setNombreMedico(e.target.value)}
        />
      </label>

      <button onClick={enviar}>
        Guardar Médico General
      </button>
    </div>
  )
}
