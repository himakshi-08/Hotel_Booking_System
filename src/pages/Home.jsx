import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaSearch, FaArrowRight, FaStar, FaQuoteLeft, FaWifi, FaSwimmingPool, FaSpa, FaUtensils } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/rooms', { state: { checkIn, checkOut, guests } });
    };

    const testimonials = [
        {
            name: "Sarah Johnson",
            rating: 5,
            text: "Absolutely stunning! The ocean view from our suite was breathtaking. The staff went above and beyond to make our anniversary special.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "Michael Chen",
            rating: 5,
            text: "Best hotel experience ever! From the luxurious rooms to the exceptional dining, everything was perfect. Can't wait to return!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "Emily Rodriguez",
            rating: 5,
            text: "A true paradise! The private villa exceeded all expectations. The butler service and private pool made it an unforgettable vacation.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
        }
    ];

    const facilities = [
        { icon: FaWifi, title: "High-Speed WiFi", desc: "Stay connected everywhere" },
        { icon: FaSwimmingPool, title: "Infinity Pool", desc: "Ocean-view relaxation" },
        { icon: FaSpa, title: "Luxury Spa", desc: "Rejuvenate your senses" },
        { icon: FaUtensils, title: "Fine Dining", desc: "World-class cuisine" }
    ];

    return (
        <div className="font-sans text-dark bg-white">
            {/* 1. Welcome Header (Text Above Image) */}
            <section className="pt-24 pb-12 text-center container mx-auto px-4 animate-fade-in-up overflow-hidden">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-tight mb-4">
                    Welcome to COCO Hotel
                </h1>
                <p className="text-2xl md:text-3xl font-light text-secondary mb-6 tracking-wide">
                    Experience the Extraordinary
                </p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Discover a sanctuary of peace and luxury. Your perfect getaway awaits where the ocean meets the sky.
                </p>
                <div className="mt-8">
                    <Link to="/rooms" className="inline-flex items-center gap-3 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors duration-300 shadow-lg hover:shadow-xl">
                        Explore Our Rooms <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* 2. Hero Image Section */}
            <section className="relative h-[60vh] md:h-[75vh] w-full mb-24">
                <div className="absolute inset-0 container mx-auto px-4">
                    <img
                        src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Light Hotel"
                        className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                </div>

                {/* Floating Search Bar */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4">
                    <div className="container mx-auto">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-5xl mx-auto hover-lift">
                            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                <div className="border-r border-gray-200 px-4">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Check-in</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="w-full font-bold text-darkest outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div className="border-r border-gray-200 px-4">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Check-out</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full font-bold text-darkest outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div className="border-r border-gray-200 px-4">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Guests</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        className="w-full font-bold text-darkest outline-none bg-transparent cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-secondary text-white h-14 rounded-2xl font-bold hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-2 text-lg shadow-md"
                                >
                                    Check Availability
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. About / Highlights Section */}
            <section className="py-3 bg-light">
                <div className="container mx-auto px-4 mt-12">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 animate-fade-in-up">
                            <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-4 block">ABOUT US</span>
                            <h2 className="text-5xl font-serif font-bold text-darkest mb-6">Redefining Luxury <br /> & Comfort</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                Since 2010, we have been helping travelers find their perfect stay.
                                Blending seamless technology with a love for discovery, we turn your travel dreams into real-world adventures.
                            </p>

                            <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
                                <div className="text-center">
                                    <h3 className="text-4xl font-bold text-primary">200+</h3>
                                    <p className="text-sm text-gray-500 mt-2">Luxury Rooms</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-4xl font-bold text-primary">50+</h3>
                                    <p className="text-sm text-gray-500 mt-2">Awards Won</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-4xl font-bold text-primary">5K+</h3>
                                    <p className="text-sm text-gray-500 mt-2">Happy Guests</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative animate-scale-in">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                                alt="Hotel Interior"
                                className="rounded-3xl shadow-2xl w-full object-cover h-[500px] hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex text-accent">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                    <div className="text-sm font-bold text-darkest">4.9/5 Rating</div>
                                </div>
                                <p className="text-xs text-gray-500">"The best hotel experience I've ever had. Highly recommended!"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Facilities Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-4 block">OUR FACILITIES</span>
                        <h2 className="text-5xl font-serif font-bold text-darkest">World-Class Amenities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {facilities.map((facility, idx) => (
                            <div key={idx} className="text-center p-8 rounded-2xl hover:bg-light transition-all duration-300 hover-lift group">
                                <facility.icon className="text-5xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-darkest mb-2">{facility.title}</h3>
                                <p className="text-gray-500">{facility.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Exclusive Rooms Grid */}
            <section className="py-20 bg-gradient-to-b from-white to-light">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-4 block">ACCOMMODATIONS</span>
                            <h2 className="text-5xl font-serif font-bold text-darkest">Exclusive Rooms</h2>
                        </div>
                        <Link to="/rooms" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline hover:gap-4 transition-all">
                            View All Rooms <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Deluxe Ocean View",
                                price: 16600,
                                image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000",
                                capacity: "2 Adults, 1 Child"
                            },
                            {
                                title: "Executive Suite",
                                price: 29050,
                                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
                                capacity: "4 Adults"
                            },
                            {
                                title: "Private Villa",
                                price: 66400,
                                image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000",
                                capacity: "6 Adults"
                            }
                        ].map((room, idx) => (
                            <div key={idx} className="group cursor-pointer hover-lift" onClick={() => navigate('/rooms')}>
                                <div className="relative overflow-hidden rounded-2xl mb-4 h-80">
                                    <img
                                        src={room.image}
                                        alt={room.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span className="text-white font-bold">View Details →</span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-darkest shadow-sm">
                                        Featured
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-darkest mb-1 group-hover:text-primary transition">{room.title}</h3>
                                        <p className="text-sm text-gray-500">{room.capacity}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-secondary">₹{room.price.toLocaleString()}</span>
                                        <span className="text-xs text-gray-400 block">/ night</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-4 block">TESTIMONIALS</span>
                        <h2 className="text-5xl font-serif font-bold text-darkest">What Our Guests Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="bg-light p-8 rounded-2xl hover-lift relative">
                                <FaQuoteLeft className="text-4xl text-secondary/20 mb-4" />
                                <div className="flex text-accent mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-darkest">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">Verified Guest</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Call to Action */}
            <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-5xl font-serif font-bold mb-6">Ready for Your Dream Vacation?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Book now and experience luxury like never before. Special offers available for early bookings.
                    </p>
                    <Link to="/rooms" className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Book Your Stay <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
