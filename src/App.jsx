import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientPage from './pages/PatientPage'
import HomePage from './pages/HomePage';
import HowItWorks from "./pages/HowItWorks";
import Clinics from "./pages/Clinics";
import Resources from "./pages/Resources";
import Support from "./pages/Support";
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
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>

  )
}


export default App
