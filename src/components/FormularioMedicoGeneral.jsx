import React, { useState } from 'react';

function FormularioMedicoGeneral({ data, onEnviar }) {
  const [examenSolicitado, setExamenSolicitado] = useState('Radiografía de tórax');
  const [nombreMedico, setNombreMedico] = useState('Médico General');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data?.nombre || !data?.rut || !data?.edad) {
      alert('Completa los datos del paciente (nombre, RUT, edad).');
      return;
    }
    if (!examenSolicitado?.trim()) {
      alert('Escribe el examen solicitado.');
      return;
    }
    onEnviar?.({
      pacienteNombre: data.nombre,
      rut: data.rut,
      edad: data.edad,
      examenSolicitado: examenSolicitado.trim(),
      nombreMedico: nombreMedico.trim(),
    });
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h1 style={styles.title}>Orden de Medicina General</h1>

      <label style={styles.label}>Examen solicitado</label>
      <input
        style={styles.input}
        type="text"
        placeholder="Ej: Radiografía de tórax / Hemograma / etc."
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

      <button style={styles.button} type="submit">
        Guardar Médico General
      </button>
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
    fontSize: '20px',
  },
  label: {
    display: 'block',
    marginTop: '15px',
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
    marginTop: '25px',
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

export default FormularioMedicoGeneral;
