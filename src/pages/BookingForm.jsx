import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/api';
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BookingForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const room = location.state?.room;

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        paymentMethod: 'credit-card'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!room) {
            navigate('/rooms');
        }
        if (!user) {
            toast.error('Please login to book a room');
            navigate('/login');
        }
    }, [room, user, navigate]);

    if (!room || !user) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateNights = () => {
        if (formData.checkIn && formData.checkOut) {
            const start = new Date(formData.checkIn);
            const end = new Date(formData.checkOut);
            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return nights > 0 ? nights : 0;
        }
        return 0;
    };

    const calculateTotal = () => {
        return calculateNights() * room.price;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to book a room');
            navigate('/login');
            return;
        }

        const nights = calculateNights();
        if (nights <= 0) {
            toast.error('Check-out date must be after check-in date');
            return;
        }

        if (formData.guests > room.capacity) {
            toast.error(`This room can accommodate maximum ${room.capacity} guests`);
            return;
        }

        setIsSubmitting(true);

        try {
            const booking = {
                userId: user.id,
                roomId: room.id,
                roomName: room.name,
                roomImage: room.image,
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
                guests: parseInt(formData.guests),
                totalPrice: calculateTotal(),
                pricePerNight: room.price,
                status: 'Confirmed',
                paymentMethod: formData.paymentMethod,
                bookedAt: new Date().toISOString()
            };

            await createBooking(booking);
            // Prompt as requested
            window.alert('Booking Successful!');
            toast.success('Booking Successful!');

            setTimeout(() => {
                navigate('/bookings');
            }, 1500);
        } catch (error) {
            console.error('Booking failed:', error);
            toast.error('Failed to create booking');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMinCheckOutDate = () => {
        if (formData.checkIn) {
            const checkIn = new Date(formData.checkIn);
            checkIn.setDate(checkIn.getDate() + 1);
            return checkIn.toISOString().split('T')[0];
        }
        return getMinDate();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-darkest mb-8">Complete Your Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Room Information */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="bg-secondary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider text-white">
                                    {room.type}
                                </span>
                                <span className="text-2xl font-bold text-primary">₹{room.price}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-darkest mb-3">{room.name}</h2>
                            <p className="text-gray-600 mb-4">{room.description}</p>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-bold text-darkest mb-3">Amenities</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {room.amenities.slice(0, 6).map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaCheckCircle className="text-primary text-xs" />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50 h-fit sticky top-8">
                    <h2 className="text-3xl font-bold text-darkest mb-6">Booking Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Check-in Date */}
                        <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                                <FaCalendarAlt className="text-primary" />
                                Check-in Date
                            </label>
                            <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleChange}
                                min={getMinDate()}
                                required
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        {/* Check-out Date */}
                        <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                                <FaCalendarAlt className="text-primary" />
                                Check-out Date
                            </label>
                            <input
                                type="date"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleChange}
                                min={getMinCheckOutDate()}
                                required
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        {/* Number of Guests */}
                        <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                                <FaUsers className="text-primary" />
                                Number of Guests
                            </label>
                            <input
                                type="number"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                min="1"
                                max={room.capacity}
                                required
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">Maximum capacity: {room.capacity} guests</p>
                        </div>

                        {/* Payment Method (Mock) */}
                        <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                                <FaCreditCard className="text-primary" />
                                Payment Method
                            </label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                            >
                                <option value="credit-card">Credit Card</option>
                                <option value="debit-card">Debit Card</option>
                                <option value="upi">UPI</option>
                                <option value="net-banking">Net Banking</option>
                                <option value="pay-at-hotel">Pay at Hotel</option>
                            </select>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Price per night</span>
                                <span className="font-semibold">₹{room.price.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Number of nights</span>
                                <span className="font-semibold">{calculateNights()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Guests</span>
                                <span className="font-semibold">{formData.guests}</span>
                            </div>
                            <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
                                <span className="text-lg font-bold text-darkest">Total Price</span>
                                <span className="text-xl font-bold text-primary">₹{calculateTotal().toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${isSubmitting
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-500">
                            By confirming, you agree to our terms and conditions
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
