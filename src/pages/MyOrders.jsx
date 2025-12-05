import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaCalendarAlt, FaTrash, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [foodOrders, setFoodOrders] = useState([]);
    const [diningReservations, setDiningReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('food-orders');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            // Fetch food orders
            const foodRes = await fetch(`http://localhost:3001/foodOrders?userId=${user.id}`);
            const foodData = await foodRes.json();
            setFoodOrders(foodData);

            // Fetch dining reservations
            const diningRes = await fetch(`http://localhost:3001/diningReservations?userEmail=${user.email}`);
            const diningData = await diningRes.json();
            setDiningReservations(diningData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDeleteFoodOrder = async (id) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                await fetch(`http://localhost:3001/foodOrders/${id}`, { method: 'DELETE' });
                toast.success('Order Cancelled Successfully');
                fetchOrders();
            } catch (error) {
                toast.error('Failed to cancel order');
            }
        }
    };

    const handleDeleteReservation = async (id) => {
        if (window.confirm('Are you sure you want to cancel this reservation?')) {
            try {
                await fetch(`http://localhost:3001/diningReservations/${id}`, { method: 'DELETE' });
                toast.success('Reservation Cancelled Successfully');
                fetchOrders();
            } catch (error) {
                toast.error('Failed to cancel reservation');
            }
        }
    };

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkest mb-8 text-center font-serif">My Orders & Reservations</h1>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setActiveTab('food-orders')}
                    className={`px-8 py-3 rounded-full font-bold transition ${activeTab === 'food-orders' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                    Food Orders ({foodOrders.length})
                </button>
                <button
                    onClick={() => setActiveTab('dining-reservations')}
                    className={`px-8 py-3 rounded-full font-bold transition ${activeTab === 'dining-reservations' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                    Dining Reservations ({diningReservations.length})
                </button>
            </div>

            {/* Food Orders Tab */}
            {activeTab === 'food-orders' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {foodOrders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
                            <p className="text-gray-500 text-lg mb-4">You haven't placed any food orders yet.</p>
                            <button onClick={() => navigate('/dining')} className="text-primary font-bold hover:underline">Order Now</button>
                        </div>
                    ) : (
                        foodOrders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-6 items-center border border-gray-100">
                                <img src={order.itemImage} alt={order.itemName} className="w-full md:w-32 h-32 object-cover rounded-xl" />
                                <div className="flex-1 space-y-2 text-center md:text-left">
                                    <h3 className="text-xl font-bold text-darkest">{order.itemName}</h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><FaUtensils /> Quantity: {order.quantity}</span>
                                        <span className="flex items-center gap-1"><FaClock /> {new Date(order.orderDate).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-primary font-bold text-lg">Total: ${order.totalPrice}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleDeleteFoodOrder(order.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition" title="Cancel">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Dining Reservations Tab */}
            {activeTab === 'dining-reservations' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {diningReservations.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
                            <p className="text-gray-500 text-lg mb-4">You haven't made any dining reservations yet.</p>
                            <button onClick={() => navigate('/dining')} className="text-primary font-bold hover:underline">Make a Reservation</button>
                        </div>
                    ) : (
                        diningReservations.map(reservation => (
                            <div key={reservation.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-darkest mb-2">Table Reservation</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="flex items-center gap-2"><FaCalendarAlt /> {new Date(reservation.date).toLocaleDateString()} at {reservation.time}</p>
                                            <p>Guests: {reservation.guests}</p>
                                            <p>Contact: {reservation.phone}</p>
                                            {reservation.specialRequests && <p className="italic">Special Requests: {reservation.specialRequests}</p>}
                                        </div>
                                        <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${reservation.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {reservation.status}
                                        </span>
                                    </div>
                                    <button onClick={() => handleDeleteReservation(reservation.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition" title="Cancel">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
