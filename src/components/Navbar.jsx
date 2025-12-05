import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-secondary/20">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                {/* Logo - Always visible */}
                <Link to="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold tracking-wider hover:text-primary transition group">
                    <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition">
                        <img src="/logo.png" alt="COCO Hotel Logo" className="h-8 md:h-10 w-auto" />
                    </div>
                    <span className="font-serif text-amber-800">COCO Hotel</span>
                </Link>

                {/* Navigation Links - Responsive */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 w-full md:w-auto">
                    <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Home</NavLink>
                    <NavLink to="/rooms" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Rooms</NavLink>
                    <NavLink to="/dining" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Dining</NavLink>
                    <NavLink to="/facilities" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Facilities</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Contact</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Dashboard</NavLink>
                            <div className="flex items-center gap-3 pl-4 md:border-l border-gray-200">
                                <span className="text-sm font-medium text-darkest flex items-center gap-2">
                                    <FaUserCircle className="text-xl text-primary" />
                                    <span className="hidden sm:inline">{user.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs md:text-sm border border-gray-300 text-gray-600 hover:bg-primary hover:text-white px-4 py-1.5 rounded-full transition uppercase tracking-wider font-bold"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4 pl-4 md:border-l border-gray-200">
                            <NavLink to="/login" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}>Login</NavLink>
                            <Link
                                to="/register"
                                className="bg-secondary text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
