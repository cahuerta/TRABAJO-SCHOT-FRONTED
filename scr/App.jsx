import React, { useState } from 'react';
import PacienteForm from './forms/PacienteForm.jsx';
import TraumatologoForm from './forms/TraumatologoForm.jsx';
import MedicoGeneralForm from './forms/MedicoGeneralForm.jsx';

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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Asistente ICA – Formularios</h1>
        {vista !== 'home' && <Button onClick={() => setVista('home')}>← Volver</Button>}
      </header>

      {vista === 'home' && (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <Button onClick={() => setVista('paciente')}>🧍 Pacientes</Button>
          <Button onClick={() => setVista('trauma')}>🦴 Traumatólogo</Button>
          <Button onClick={() => setVista('mg')}>🩺 Médico general</Button>
        </div>
      )}

      {vista === 'paciente' && <PacienteForm />}
      {vista === 'trauma' && <TraumatologoForm />}
      {vista === 'mg' && <MedicoGeneralForm />}
    </div>
  );
}
