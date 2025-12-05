import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditBooking = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    useEffect(() => {
        if (!user) {
            toast.error('Please login to edit bookings');
            navigate('/login');
            return;
        }

        // Fetch booking details
        fetch(`http://localhost:3001/bookings/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.userId !== user.id) {
                    toast.error('Unauthorized access');
                    navigate('/bookings');
                    return;
                }
                setBooking(data);
                setFormData({
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    guests: data.guests || 1
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching booking:', err);
                toast.error('Failed to load booking details');
                navigate('/bookings');
            });
    }, [id, user, navigate]);

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
        if (!booking) return 0;
        return calculateNights() * booking.pricePerNight;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nights = calculateNights();
        if (nights <= 0) {
            toast.error('Check-out date must be after check-in date');
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedBooking = {
                ...booking,
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
                guests: parseInt(formData.guests),
                totalPrice: calculateTotal()
            };

            const response = await fetch(`http://localhost:3001/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBooking)
            });

            if (!response.ok) {
                throw new Error('Failed to update booking');
            }

            toast.success('Booking Updated Successfully!');
            setTimeout(() => {
                navigate('/bookings');
            }, 1500);
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update booking');
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (!booking) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <button
                onClick={() => navigate('/bookings')}
                className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition"
            >
                <FaArrowLeft /> Back to My Bookings
            </button>

            <h1 className="text-4xl font-bold text-darkest mb-8">Edit Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Booking Information */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <img
                            src={booking.roomImage}
                            alt={booking.roomName}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-darkest mb-3">{booking.roomName}</h2>
                            <div className="space-y-2 text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span className="font-semibold">Booking ID:</span>
                                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{booking.id}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-semibold">Status:</span>
                                    <span className={`text-sm px-3 py-1 rounded-full font-bold ${booking.status === 'Confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-semibold">Price per night:</span>
                                    <span className="text-primary font-bold">₹{booking.pricePerNight?.toLocaleString('en-IN')}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-primary/10">
                        <h3 className="font-bold text-darkest mb-3">Original Booking Details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-semibold">Check-in:</span> {booking.checkIn}</p>
                            <p><span className="font-semibold">Check-out:</span> {booking.checkOut}</p>
                            <p><span className="font-semibold">Guests:</span> {booking.guests}</p>
                            <p><span className="font-semibold">Total Price:</span> ₹{booking.totalPrice?.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50 h-fit sticky top-8">
                    <h2 className="text-3xl font-bold text-darkest mb-6">Update Booking Details</h2>

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
                                max="10"
                                required
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        {/* Updated Price Summary */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-darkest mb-3">Updated Price Summary</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600">Price per night</span>
                                <span className="font-semibold">₹{booking.pricePerNight?.toLocaleString('en-IN')}</span>
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
                                <span className="text-lg font-bold text-darkest">New Total Price</span>
                                <span className="text-xl font-bold text-primary">₹{calculateTotal().toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/bookings')}
                                className="flex-1 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${isSubmitting
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
                                        Updating...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBooking;
