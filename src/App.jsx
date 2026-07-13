import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientPage from './pages/PatientPage'
import RequestsPage from './pages/RequestsPage'
import HomePage from './pages/HomePage';
import HowItWorks from "./pages/HowItWorks";
import Clinics from "./pages/Clinics";
import Resources from "./pages/Resources";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import '@mantine/core/styles.css'; // Import Mantine styles
import { MantineProvider } from '@mantine/core';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <MantineProvider>
      <Router basename="/qjump">
        <div className="App">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/patient/:patientId"
                element={
                  <ProtectedRoute>
                    <PatientPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/:patientId/requests"
                element={
                  <ProtectedRoute>
                    <RequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/clinics" element={<Clinics />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/support" element={<Support />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  )
}

export default App