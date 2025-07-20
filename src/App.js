import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import Public-Facing Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/About/About';
import ContactUs from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import Service from './pages/Service/Service';

// Import Dashboard & Auth Components
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeProfilesPage from './pages/EmployeeProfilesPage';
import SignupPage from './pages/SignupPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

// Wrapper for routes that require a user to be logged in
function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

// Main component to handle layout and routing logic
const AppContent = () => {
    const location = useLocation();
    
    // Hide Navbar and Footer on login and all dashboard routes
    const shouldHideLayout = location.pathname === '/login' ||
                             location.pathname === '/signup' ||
                             location.pathname.startsWith('/dashboard') ||
                             location.pathname.startsWith('/project');

    return (
        <div>
            {!shouldHideLayout && <Navbar />}
            
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/service" element={<Service />} />

                {/* Authentication Route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Dashboard Routes */}
                <Route 
                    path="/dashboard" 
                    element={<PrivateRoute><DashboardPage /></PrivateRoute>} 
                />
                <Route 
                    path="/dashboard/profiles" 
                    element={<PrivateRoute><EmployeeProfilesPage /></PrivateRoute>} 
                />
                <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
            </Routes>
            
            {!shouldHideLayout && <Footer />}
        </div>
    );
};

// The main App component wraps everything in providers
const App = () => (
    <Router>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    </Router>
);

export default App;