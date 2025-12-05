import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaHistory, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    if (!user) return <div className="text-center py-20">Please login to view dashboard</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            toast.success('Profile Updated Successfully!');
            setShowEditModal(false);
            // Note: In a real app, you'd also update the auth context
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkest mb-8 text-center font-serif">My Dashboard</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center md:col-span-1">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                        <FaUserCircle className="text-6xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-darkest mb-2">{user.name}</h2>
                    <p className="text-gray-500 mb-6">{user.email}</p>
                    <button
                        onClick={() => {
                            setFormData({ name: user.name, email: user.email });
                            setShowEditModal(true);
                        }}
                        className="w-full mb-3 bg-primary text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition"
                    >
                        Edit Profile
                    </button>
                    <button onClick={logout} className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Link to="/bookings" className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition">
                            <FaHistory className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold text-darkest mb-2">My Bookings</h3>
                        <p className="text-gray-500">View and manage your room bookings.</p>
                    </Link>

                    <Link to="/my-orders" className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition">
                            <FaCog className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold text-darkest mb-2">My Orders</h3>
                        <p className="text-gray-500">View food orders and dining reservations.</p>
                    </Link>

                    <Link to="/rooms" className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition">
                            <FaCog className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold text-darkest mb-2">Browse Rooms</h3>
                        <p className="text-gray-500">Explore our luxury rooms.</p>
                    </Link>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <FaTimes className="text-2xl" />
                        </button>

                        <h2 className="text-3xl font-bold text-darkest mb-6">Edit Profile</h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 py-3 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary transition shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
