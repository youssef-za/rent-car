import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BrowseCars from './pages/BrowseCars';
import ManageCars from './pages/ManageCars';
import MyBookings from './pages/MyBookings';
import ManageBookings from './pages/ManageBookings';
import ManageUsers from './pages/ManageUsers';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin()) return <Navigate to="/client" />;

  return <Layout>{children}</Layout>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Client Routes */}
          <Route path="/client" element={<PrivateRoute><BrowseCars /></PrivateRoute>} />
          <Route path="/client/bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/cars" element={<PrivateRoute adminOnly><ManageCars /></PrivateRoute>} />
          <Route path="/admin/bookings" element={<PrivateRoute adminOnly><ManageBookings /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute adminOnly><ManageUsers /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
