import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext'; // NEW: Our custom toast system
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import UserDashboard from './pages/UserDashboard';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import Dining from './pages/Dining';
import Bookings from './pages/Bookings';
import ServiceBooking from './pages/ServiceBooking';
import About from './pages/About';
import BookingForm from './pages/BookingForm';
import EditBooking from './pages/EditBooking';
import MyOrders from './pages/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-light flex flex-col font-sans text-dark">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service-booking" element={<ServiceBooking />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking-form" element={<BookingForm />} />
                <Route path="/edit-booking/:id" element={<EditBooking />} />
                <Route path="/my-orders" element={<MyOrders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
