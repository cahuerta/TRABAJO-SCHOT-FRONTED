import React from 'react'

/**
 * Formulario de datos del paciente.
 * Controlado por el padre vía props: data, onChange y onGuardar.
 *
 * data: { nombre, rut, edad, dolor, lado }
 * onChange: (campo, valor) => void
 * onGuardar: () => void
 */
export default function FormularioPaciente({ data, onChange, onGuardar }) {
  const handle = (e) => onChange(e.target.name, e.target.value)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label>
        Nombre
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={data.nombre || ''}
          onChange={handle}
        />
      </label>

      <label>
        RUT
        <input
          name="rut"
          placeholder="12.345.678-9"
          value={data.rut || ''}
          onChange={handle}
        />
      </label>

      <label>
        Edad
        <input
          name="edad"
          type="number"
          placeholder="Edad"
          value={data.edad || ''}
          onChange={handle}
        />
      </label>

      <label>
        Dolor (zona)
        <select name="dolor" value={data.dolor || ''} onChange={handle}>
          <option value="">Seleccione…</option>
          <option value="Rodilla">Rodilla</option>
          <option value="Cadera">Cadera</option>
          <option value="Columna lumbar">Columna lumbar</option>
        </select>
      </label>

      <label>
        Lado
        <select name="lado" value={data.lado || ''} onChange={handle}>
          <option value="">Seleccione…</option>
          <option value="Derecha">Derecha</option>
          <option value="Izquierda">Izquierda</option>
          <option value="Bilateral">Bilateral</option>
        </select>
      </label>

      <button onClick={onGuardar}>
        Guardar Paciente
      </button>
    </div>
  )
}
