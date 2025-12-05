import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaUser, FaWind, FaCheck, FaStar, FaArrowLeft } from 'react-icons/fa';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/rooms/${id}`)
            .then(res => res.json())
            .then(data => {
                setRoom(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching room details:", err));
    }, [id]);

    if (loading) return <div className="text-center py-20 text-primary font-bold">Loading Details...</div>;
    if (!room) return <div className="text-center py-20 text-red-500">Room not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition">
                <FaArrowLeft /> Back to Rooms
            </button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Hero Image */}
                <div className="relative h-[400px] md:h-[500px]">
                    <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <span className="bg-secondary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                                {room.type}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{room.name}</h1>
                            <p className="text-xl opacity-90">₹{room.price} <span className="text-sm">/ night</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 p-8">
                    {/* Details */}
                    <div className="md:w-2/3 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-darkest mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {room.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-darkest mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {room.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                            <FaCheck className="text-sm" />
                                        </div>
                                        <span className="font-medium text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Mock */}
                        <div>
                            <h2 className="text-2xl font-bold text-darkest mb-4">Guest Reviews</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2 text-yellow-400">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    </div>
                                    <p className="text-gray-600 italic">"Absolutely stunning room! The view was breathtaking and the service was impeccable."</p>
                                    <p className="text-sm font-bold text-gray-800 mt-2">- Sarah J.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="md:w-1/3">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-darkest mb-6">Book This Room</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Price per night</span>
                                    <span className="font-bold text-darkest">₹{room.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Capacity</span>
                                    <span className="font-bold text-darkest">{room.capacity} Persons</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/booking-form', { state: { room } })}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-primary/30 text-lg"
                            >
                                Book Now
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                No credit card required for reservation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
