import React, { useState } from 'react';
import { postJSON } from './api';

export default function FormularioTraumatologo() {
  const [form, setForm] = useState({
    pacienteNombre: '',
    rut: '',
    edad: '',
    examenSolicitado: '',
    nombreMedico: '',
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);
    try {
      await postJSON('/api/traumatologo', {
        pacienteNombre: form.pacienteNombre,
        rut: form.rut,
        edad: form.edad,
        examenSolicitado: form.examenSolicitado,
        nombreMedico: form.nombreMedico,
        especialidad: 'Traumatólogo', // se envía automáticamente
      });
      setMensaje('✔ Datos guardados en Google Sheets');
      setForm({
        pacienteNombre: '',
        rut: '',
        edad: '',
        examenSolicitado: '',
        nombreMedico: '',
      });
    } catch (err) {
      setMensaje(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h1 style={styles.title}>Registro Traumatólogo</h1>

      <label style={styles.label}>Nombre del paciente:</label>
      <input
        style={styles.input}
        value={form.pacienteNombre}
        onChange={(e) => set('pacienteNombre', e.target.value)}
        required
      />

      <label style={styles.label}>RUT:</label>
      <input
        style={styles.input}
        value={form.rut}
        onChange={(e) => set('rut', e.target.value)}
        required
      />

      <label style={styles.label}>Edad:</label>
      <input
        style={styles.input}
        type="number"
        min="10"
        max="110"
        value={form.edad}
        onChange={(e) => set('edad', e.target.value)}
        required
      />

      <label style={styles.label}>Examen solicitado:</label>
      <input
        style={styles.input}
        value={form.examenSolicitado}
        onChange={(e) => set('examenSolicitado', e.target.value)}
        required
      />

      <label style={styles.label}>Nombre del médico:</label>
      <input
        style={styles.input}
        value={form.nombreMedico}
        onChange={(e) => set('nombreMedico', e.target.value)}
        required
      />

      <button style={styles.button} type="submit" disabled={loading}>
        {loading ? 'Guardando…' : 'Guardar en Google Sheets'}
      </button>

      {mensaje && <div style={{ marginTop: 12, fontSize: 14 }}>{mensaje}</div>}
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
  title: { marginBottom: '20px', color: '#0072CE', textAlign: 'center' },
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
