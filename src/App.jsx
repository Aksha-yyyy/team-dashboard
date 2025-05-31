import { useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Team Dashboard</h1>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Team Dashboard</p>
        </div>
      </footer>
    </div>
  )
}

export default App