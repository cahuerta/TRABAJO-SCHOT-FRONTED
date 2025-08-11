import React, { useState } from 'react';
import FormularioPaciente from './formulariopaciente.jsx';
import FormularioTraumatologo from './FormularioTraumatologo.jsx';
import FormularioMedicoGeneral from './FormularioMedicoGeneral.jsx';

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 18px',
        borderRadius: 12,
        border: '1px solid #ddd',
        cursor: 'pointer',
        fontSize: 16,
        background: '#f9f9f9'
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [vista, setVista] = useState('home');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h1 style={{ margin: 0 }}>Asistente ICA</h1>
        {vista !== 'home' && (
          <Button onClick={() => setVista('home')}>← Volver</Button>
        )}
      </header>

      {vista === 'home' && (
        <div style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
        }}>
          <Button onClick={() => setVista('paciente')}>🧍 Pacientes</Button>
          <Button onClick={() => setVista('trauma')}>🦴 Traumatólogo</Button>
          <Button onClick={() => setVista('mg')}>🩺 Médico general</Button>
        </div>
      )}

      {vista === 'paciente' && <FormularioPaciente />}
      {vista === 'trauma' && <FormularioTraumatologo />}
      {vista === 'mg' && <FormularioMedicoGeneral />}
    </div>
  );
}
