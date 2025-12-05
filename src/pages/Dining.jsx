import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FoodCard from '../components/FoodCard';
import { createDiningReservation } from '../services/api';
import { toast } from 'react-toastify';

const diningData = {
    breakfast: [
        {
            id: 1,
            name: "Royal Eggs Benedict",
            description: "Poached eggs on toasted English muffin with smoked salmon and hollandaise sauce.",
            price: 25,
            image: "https://plus.unsplash.com/premium_photo-1692833836734-444befd523f0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWdncyUyMGJlbmVkaWN0fGVufDB8fDB8fHww"
        },
        {
            id: 2,
            name: "Belgian Waffles Deluxe",
            description: "Crispy waffles served with fresh berries, whipped cream, and maple syrup.",
            price: 18,
            image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Continental Platter",
            description: "Assortment of fresh pastries, fruits, cheeses, and cold cuts.",
            price: 22,
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800"
        }
    ],
    lunch: [
        {
            id: 4,
            name: "Lobster Bisque",
            description: "Creamy soup made with fresh lobster, brandy, and aromatic herbs.",
            price: 35,
            image: "https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            name: "Wagyu Beef Burger",
            description: "Premium Wagyu beef patty with truffle mayo, caramelized onions, and gruyere cheese.",
            price: 45,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 6,
            name: "Caesar Salad",
            description: "Crisp romaine lettuce, parmesan cheese, croutons, and our signature dressing.",
            price: 20,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
        }
    ],
    dinner: [
        {
            id: 7,
            name: "Filet Mignon",
            description: "Tender beef steak served with mashed potatoes and red wine reduction.",
            price: 65,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 8,
            name: "Pan-Seared Scallops",
            description: "Jumbo scallops with cauliflower puree and lemon butter sauce.",
            price: 55,
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 9,
            name: "Truffle Risotto",
            description: "Creamy arborio rice with black truffles and parmesan cheese.",
            price: 40,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
        }
    ]
};

const Dining = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('breakfast');
    const [showReservationForm, setShowReservationForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOrder = async (item) => {
        if (!user) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        const confirmed = window.confirm(`Would you like to place an order for ${item.name} for $${item.price}?`);
        if (confirmed) {
            try {
                const order = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    itemId: item.id,
                    itemName: item.name,
                    itemPrice: item.price,
                    itemImage: item.image,
                    quantity: 1,
                    totalPrice: item.price,
                    status: 'Confirmed',
                    orderDate: new Date().toISOString()
                };

                const response = await fetch('http://localhost:3001/foodOrders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)
                });

                if (!response.ok) throw new Error('Failed to place order');

                toast.success(`Order Placed Successfully!`);
            } catch (error) {
                console.error('Order failed:', error);
                toast.error('Failed to place order. Please try again.');
            }
        }
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservation = {
                ...formData,
                id: Math.random().toString(36).substr(2, 9),
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            };

            await createDiningReservation(reservation);
            toast.success('Reservation confirmed! We look forward to serving you.');
            setShowReservationForm(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: 2,
                specialRequests: ''
            });
        } catch (error) {
            toast.error('Failed to create reservation. Please try again.');
        }
    };

    return (
        <div className="space-y-12 animate-fade-in-up">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-secondary font-serif">Exquisite Dining</h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Indulge in a culinary journey with our world-class chefs. From sunrise breakfasts to romantic dinners, we offer flavors that delight the senses.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 md:gap-8 border-b border-gray-200 pb-4">
                {['breakfast', 'lunch', 'dinner'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-lg font-semibold px-6 py-2 rounded-full transition-all duration-300 capitalize ${activeTab === tab
                            ? 'bg-secondary text-white shadow-lg scale-105'
                            : 'text-slate-600 hover:text-secondary hover:bg-light'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {diningData[activeTab].map((item) => (
                    <FoodCard key={item.id} item={item} onOrder={handleOrder} />
                ))}
            </div>

            {/* Reservation Section */}
            <div className="bg-gradient-to-r from-light to-white rounded-3xl p-12 text-center border border-gray-100 mt-16 shadow-lg">
                <h2 className="text-4xl font-bold text-secondary font-serif mb-4">Reserve Your Table</h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto text-lg">
                    To ensure the best experience, we recommend booking your table in advance. Private dining options are also available.
                </p>

                {!showReservationForm ? (
                    <button
                        onClick={() => setShowReservationForm(true)}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider"
                    >
                        Make a Reservation
                    </button>
                ) : (
                    <form onSubmit={handleReservationSubmit} className="max-w-2xl mx-auto mt-8 text-left bg-white p-8 rounded-2xl shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Number of Guests *</label>
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Time *</label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    required
                                >
                                    <option value="">Select Time</option>
                                    <option value="07:00">7:00 AM</option>
                                    <option value="08:00">8:00 AM</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Dietary restrictions, allergies, special occasions, etc."
                            />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Confirm Reservation
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowReservationForm(false)}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Dining;
