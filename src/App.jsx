import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css'; // Always import styles before your custom application files
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientPage from './pages/PatientPage'
// import HomePage from './pages/HomePage'
function App() {

  return (
    <MantineProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<PatientPage patientId="101"/>} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  )
}


export default App
