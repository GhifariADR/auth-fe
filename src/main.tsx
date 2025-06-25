import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './Routes/ProtectedRoute';
import SignUp from './pages/SignUp';
import PublicRoute from './Routes/PublicRoute';
import RentalUnitDetail from './pages/unit/RentalUnitDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UnitCreateForm from './pages/unit/UnitCreateForm';
import UserManagement from './pages/user/UserManagement';

export const renderApp = () => {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/rentalUnitDetail/:id" element={<RentalUnitDetail />} />
                    <Route path="/unitCreateForm" element={<UnitCreateForm />} />
                    <Route path="/userManagement" element={<UserManagement />} />
                </Route>
            </Routes>
        </BrowserRouter>

        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        />
    </StrictMode>
  );
};
