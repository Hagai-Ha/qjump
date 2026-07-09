import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientPage from './pages/PatientPage'
// import HomePage from './pages/HomePage'
function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<PatientPage />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
