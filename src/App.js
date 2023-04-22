import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log('auth?', isAuthenticated)
  console.log('loading?', isLoading)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
