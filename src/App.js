import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<ProtectedRoute currentUser={currentUser}><Dashboard /></ProtectedRoute>} /> */}
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
