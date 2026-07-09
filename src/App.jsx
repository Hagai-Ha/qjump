import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientPage from './pages/PatientPage'
import HomePage from './pages/HomePage';
import '@mantine/core/styles.css'; // Import Mantine styles
import { MantineProvider } from '@mantine/core';
function App() {

  return (
    <MantineProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patient/:patientId" element={<PatientPage />} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>

  )
}


export default App
