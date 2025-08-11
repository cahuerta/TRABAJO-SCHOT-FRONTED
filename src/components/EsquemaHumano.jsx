import React, { useState } from 'react'

/**
 * Esquema humano muy simple y clickeable.
 * Zonas: Rodilla (Der/Izq), Cadera (Der/Izq), Columna lumbar (sin lado).
 *
 * onSeleccion: ({ dolor, lado }) => void
 */
export default function EsquemaHumano({ onSeleccion }) {
  const [sel, setSel] = useState({ dolor: '', lado: '' })

  const pick = (dolor, lado = '') => {
    const v = { dolor, lado }
    setSel(v)
    onSeleccion && onSeleccion(v)
  }

  const isSel = (dolor, lado = '') =>
    sel.dolor === dolor && (lado ? sel.lado === lado : sel.lado === '')

  // Estilos básicos
  const base = { fill: '#eaeaea', stroke: '#888', strokeWidth: 1 }
  const hot = { fill: '#ffd966', stroke: '#cc9900', strokeWidth: 2 }
  const hit = { cursor: 'pointer' }

  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 200 420" width="260" height="520" aria-label="Esquema humano">
        {/* Silueta simplificada */}
        <circle cx="100" cy="40" r="22" style={base} />
        <rect x="80" y="62" width="40" height="80" rx="8" style={base} />
        {/* Brazos */}
        <rect x="42" y="70" width="30" height="18" rx="8" style={base} />
        <rect x="128" y="70" width="30" height="18" rx="8" style={base} />
        {/* Pelvis */}
        <rect x="75" y="144" width="50" height="28" rx="8" style={base} />
        {/* Piernas */}
        <rect x="78" y="174" width="16" height="110" rx="8" style={base} />
        <rect x="106" y="174" width="16" height="110" rx="8" style={base} />
        {/* Tibias */}
        <rect x="78" y="286" width="16" height="90" rx="8" style={base} />
        <rect x="106" y="286" width="16" height="90" rx="8" style={base} />

        {/* ===== ZONAS CLICKEABLES ===== */}

        {/* Columna lumbar (zona media-baja de la espalda/abdomen) */}
        <rect
          x="88" y="120" width="24" height="28" rx="6"
          style={{ ...(isSel('Columna lumbar') ? hot : { fill: 'transparent', stroke: 'transparent' }) }}
          onClick={() => pick('Columna lumbar', '')}
        >
          <title>Columna lumbar</title>
        </rect>

        {/* Cadera izquierda (visual izquierda = lado derecho del SVG) */}
        <ellipse
          cx="118" cy="158" rx="12" ry="10"
          style={{ ...(isSel('Cadera', 'Izquierda') ? hot : { fill: 'transparent', stroke: 'transparent' }), ...hit }}
          onClick={() => pick('Cadera', 'Izquierda')}
        >
          <title>Cadera Izquierda</title>
        </ellipse>

        {/* Cadera derecha */}
        <ellipse
          cx="82" cy="158" rx="12" ry="10"
          style={{ ...(isSel('Cadera', 'Derecha') ? hot : { fill: 'transparent', stroke: 'transparent' }), ...hit }}
          onClick={() => pick('Cadera', 'Derecha')}
        >
          <title>Cadera Derecha</title>
        </ellipse>

        {/* Rodilla izquierda */}
        <ellipse
          cx="114" cy="282" rx="10" ry="10"
          style={{ ...(isSel('Rodilla', 'Izquierda') ? hot : { fill: 'transparent', stroke: 'transparent' }), ...hit }}
          onClick={() => pick('Rodilla', 'Izquierda')}
        >
          <title>Rodilla Izquierda</title>
        </ellipse>

        {/* Rodilla derecha */}
        <ellipse
          cx="90" cy="282" rx="10" ry="10"
          style={{ ...(isSel('Rodilla', 'Derecha') ? hot : { fill: 'transparent', stroke: 'transparent' }), ...hit }}
          onClick={() => pick('Rodilla', 'Derecha')}
        >
          <title>Rodilla Derecha</title>
        </ellipse>
      </svg>

      {/* Leyenda + selección actual */}
      <div style={{ fontSize: 14, color: '#333' }}>
        <b>Selección:</b>{' '}
        {sel.dolor ? `${sel.dolor}${sel.lado ? ' ' + sel.lado : ''}` : '—'}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => pick('Columna lumbar', '')}>Columna lumbar</button>
        <button onClick={() => pick('Cadera', 'Derecha')}>Cadera Derecha</button>
        <button onClick={() => pick('Cadera', 'Izquierda')}>Cadera Izquierda</button>
        <button onClick={() => pick('Rodilla', 'Derecha')}>Rodilla Derecha</button>
        <button onClick={() => pick('Rodilla', 'Izquierda')}>Rodilla Izquierda</button>
      </div>
    </div>
  )
}
