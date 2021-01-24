import React from 'react';
import './loader.css';

export default function Loader() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="loader" />
      <div
        style={{ fontWeight: 'bold', paddingTop: 20 }}
      >
        PLEASE WAIT
      </div>
    </div>
  )
}
