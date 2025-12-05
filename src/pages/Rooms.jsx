import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFilter, FaBed, FaUser, FaWind, FaCheck } from 'react-icons/fa';

const Rooms = () => {
    const location = useLocation();
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [priceRange, setPriceRange] = useState(150000);
    const [capacity, setCapacity] = useState('all');
    const [type, setType] = useState('all');
    const [ac, setAc] = useState('all');

    useEffect(() => {
        fetch('http://localhost:3001/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setFilteredRooms(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching rooms:", err));
    }, []);

    useEffect(() => {
        let result = rooms;

        // Filter by Price
        result = result.filter(room => room.price <= priceRange);

        // Filter by Capacity
        if (capacity !== 'all') {
            result = result.filter(room => room.capacity >= parseInt(capacity));
        }

        // Filter by Type
        if (type !== 'all') {
            result = result.filter(room => room.type === type);
        }

        // Filter by AC (Assuming AC is in amenities)
        if (ac !== 'all') {
            if (ac === 'yes') {
                result = result.filter(room => room.amenities.includes('AC'));
            } else {
                result = result.filter(room => !room.amenities.includes('AC'));
            }
        }

        setFilteredRooms(result);
    }, [rooms, priceRange, capacity, type, ac]);

    if (loading) return <div className="text-center py-20 text-primary font-bold text-xl">Loading Rooms...</div>;

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-4xl font-bold text-darkest mb-6 text-center font-serif">Our Luxurious Rooms</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Filters */}
                <aside className="lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg h-fit border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 text-primary border-b border-gray-100 pb-4">
                        <FaFilter />
                        <h2 className="text-xl font-bold">Filters</h2>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Max Price: ₹{priceRange}</label>
                        <input
                            type="range"
                            min="5000"
                            max="150000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full accent-primary"
                        />
                    </div>

                    {/* Capacity Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Guests</label>
                        <select
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                        >
                            <option value="all">Any</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 Persons</option>
                            <option value="4">4 Persons</option>
                            <option value="6">6+ Persons</option>
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Room Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                        >
                            <option value="all">All Types</option>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                            <option value="Villa">Villa</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>

                    {/* AC Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">AC / Non-AC</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="ac"
                                    value="all"
                                    checked={ac === 'all'}
                                    onChange={(e) => setAc(e.target.value)}
                                    className="accent-primary"
                                /> Any
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="ac"
                                    value="yes"
                                    checked={ac === 'yes'}
                                    onChange={(e) => setAc(e.target.value)}
                                    className="accent-primary"
                                /> AC
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="ac"
                                    value="no"
                                    checked={ac === 'no'}
                                    onChange={(e) => setAc(e.target.value)}
                                    className="accent-primary"
                                /> Non-AC
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Room List */}
                <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map(room => (
                            <div key={room.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-100 hover:-translate-y-1">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                                        {room.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-darkest">{room.name}</h3>
                                        <span className="text-xl font-bold text-secondary">₹{room.price}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>

                                    <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-600">
                                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md"><FaUser className="text-primary/70" /> {room.capacity} Guests</span>
                                        {room.amenities.includes('AC') && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md"><FaWind className="text-primary/70" /> AC</span>}
                                        {room.amenities.slice(0, 2).map((amenity, idx) => (
                                            amenity !== 'AC' && <span key={idx} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md"><FaCheck className="text-primary/70" /> {amenity}</span>
                                        ))}
                                    </div>

                                    <Link
                                        to={`/rooms/${room.id}`}
                                        className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-primary/30"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No rooms match your filters. Try adjusting them.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rooms;
