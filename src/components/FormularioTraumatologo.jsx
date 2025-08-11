import React, { useState } from 'react'

/**
 * Formulario para registrar orden del Traumatólogo.
 * Usa los datos del paciente (data) y permite editar:
 *  - examenSolicitado
 *  - nombreMedico
 *
 * onEnviar(payload) debe enviar al backend:
 * {
 *   pacienteNombre, rut, edad, examenSolicitado, nombreMedico
 * }
 */
export default function FormularioTraumatologo({ data, onEnviar }) {
  const [examenSolicitado, setExamenSolicitado] = useState(
    data?.dolor ? `Estudio de ${data.dolor}${data?.lado ? ' ' + data.lado : ''}` : ''
  )
  const [nombreMedico, setNombreMedico] = useState('Dr. Cristóbal Huerta')

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
          placeholder="Resonancia rodilla derecha / RX cadera AP-L / etc."
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
        Guardar Traumatólogo
      </button>
    </div>
  )
}
