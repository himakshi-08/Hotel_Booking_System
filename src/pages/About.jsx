import { FaTrophy, FaStar, FaHeart } from 'react-icons/fa';

const About = () => {
    const awards = [
        { year: '2023', title: 'Best Luxury Hotel', organization: 'Travel Excellence Awards' },
        { year: '2022', title: 'Outstanding Service', organization: 'Hospitality Industry Awards' },
        { year: '2021', title: 'Top Rated Resort', organization: 'Global Hotel Awards' },
        { year: '2020', title: 'Best Ocean View Property', organization: 'Coastal Tourism Board' }
    ];

    return (
        <div className="font-sans text-dark">
            {/* Hero Image - Clean without text */}
            <section className="relative h-[50vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
                        alt="COCO Hotel"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10" />
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-6 block">OUR STORY</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-8">
                            Welcome to COCO Hotel
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Nestled along the pristine coastline, COCO Hotel has been a beacon of luxury and comfort for over a decade.
                            Our journey began with a simple vision: to create a sanctuary where travelers can escape the ordinary and embrace the extraordinary.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            From our stunning ocean-view rooms to our world-class amenities, every detail has been carefully curated to ensure
                            your stay is nothing short of perfect. We blend modern elegance with warm hospitality, creating an atmosphere
                            that feels both luxurious and like home.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                <FaHeart className="text-3xl text-primary" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-amber-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide exceptional hospitality experiences that exceed expectations, creating lasting memories
                                for every guest. We are committed to delivering personalized service, maintaining the highest standards
                                of quality, and fostering a culture of warmth and genuine care.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                                <FaStar className="text-3xl text-secondary" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-amber-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be recognized as the premier luxury destination, setting new standards in hospitality excellence.
                                We envision a future where COCO Hotel is synonymous with unforgettable experiences, sustainable practices,
                                and a commitment to enriching the lives of our guests and community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-2xl mb-6 block">RECOGNITION</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-4">
                            Awards & Achievements
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our commitment to excellence has been recognized by prestigious organizations worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {awards.map((award, index) => (
                            <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10 hover:shadow-xl transition group">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                    <FaTrophy className="text-2xl text-white" />
                                </div>
                                <div className="text-2xl font-bold text-primary mb-2">{award.year}</div>
                                <h4 className="text-lg font-bold text-darkest mb-2">{award.title}</h4>
                                <p className="text-sm text-gray-600">{award.organization}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-amber-800 to-amber-950 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">200+</div>
                            <div className="text-white/80 uppercase tracking-wider text-sm">Luxury Rooms</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">50+</div>
                            <div className="text-white/80 uppercase tracking-wider text-sm">Awards Won</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">5K+</div>
                            <div className="text-white/80 uppercase tracking-wider text-sm">Happy Guests</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">15+</div>
                            <div className="text-white/80 uppercase tracking-wider text-sm">Years Experience</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
