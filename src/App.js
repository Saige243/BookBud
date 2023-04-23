import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Profile from './pages/Profile'


const TestRoutes = () => {
  <Route path="/profile" element={<Profile />} />
}

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log('auth?', isAuthenticated)
  console.log('loading?', isLoading)

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
