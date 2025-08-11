import React, { useState } from 'react';

function FormularioTraumatologo({ data, onEnviar }) {
  const [examenSolicitado, setExamenSolicitado] = useState('');
  const [nombreMedico, setNombreMedico] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data?.nombre || !data?.rut || !data?.edad) {
      alert('Completa los datos del paciente (nombre, RUT y edad).');
      return;
    }
    if (!examenSolicitado.trim() || !nombreMedico.trim()) {
      alert('Completa examen solicitado y nombre del médico.');
      return;
    }

    onEnviar?.({
      // datos del paciente
      pacienteNombre: data.nombre,
      rut: data.rut,
      edad: data.edad,
      dolor: data.dolor || '',
      lado: data.lado || '',
      // datos del formulario de traumatólogo
      examenSolicitado: examenSolicitado.trim(),
      nombreMedico: nombreMedico.trim(),
      // el backend agrega "especialidad" automáticamente
    });
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h1 style={styles.title}>Formulario Traumatólogo</h1>

      {/* Datos del paciente (solo lectura) */}
      <fieldset style={styles.fs}>
        <legend style={styles.legend}>Datos del paciente</legend>
        <label style={styles.label}>Nombre</label>
        <input style={styles.input} value={data?.nombre || ''} disabled />

        <label style={styles.label}>RUT</label>
        <input style={styles.input} value={data?.rut || ''} disabled />

        <label style={styles.label}>Edad</label>
        <input style={styles.input} value={data?.edad || ''} disabled />

        <label style={styles.label}>Dolor</label>
        <input style={styles.input} value={data?.dolor || ''} disabled />

        <label style={styles.label}>Lado</label>
        <input style={styles.input} value={data?.lado || ''} disabled />
      </fieldset>

      {/* Campos propios */}
      <label style={styles.label}>Examen solicitado</label>
      <input
        style={styles.input}
        type="text"
        value={examenSolicitado}
        onChange={(e) => setExamenSolicitado(e.target.value)}
        required
      />

      <label style={styles.label}>Nombre del médico</label>
      <input
        style={styles.input}
        type="text"
        value={nombreMedico}
        onChange={(e) => setNombreMedico(e.target.value)}
        required
      />

      <button style={styles.button} type="submit">Guardar Traumatólogo</button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: 'white',
    padding: '30px 40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
    color: '#0072CE',
    textAlign: 'center',
  },
  fs: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: '12px',
    marginBottom: 12,
  },
  legend: {
    padding: '0 6px',
    color: '#555',
    fontSize: 12,
  },
  label: {
    display: 'block',
    marginTop: '12px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px 10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  button: {
    marginTop: '18px',
    backgroundColor: '#0072CE',
    color: 'white',
    border: 'none',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.3s ease',
  },
};

export default FormularioTraumatologo;
