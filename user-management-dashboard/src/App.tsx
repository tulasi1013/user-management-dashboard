import React from 'react'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Management Dashboard</h1>
      </header>
      <main className="app-main">
        <Dashboard />
      </main>
      <footer className="app-footer">JSONPlaceholder demo • React + TypeScript + Vite</footer>
    </div>
  )
}

export default App
