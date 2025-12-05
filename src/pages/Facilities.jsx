import { FaSwimmingPool, FaWifi, FaUtensils, FaSpa, FaParking, FaDumbbell } from 'react-icons/fa';

const Facilities = () => {
    const facilities = [
        { icon: <FaSwimmingPool />, name: "Infinity Pool", desc: "Ocean-view pool with temperature control." },
        { icon: <FaWifi />, name: "High-Speed WiFi", desc: "Complimentary internet access throughout the property." },
        { icon: <FaUtensils />, name: "Fine Dining", desc: "Multi-cuisine restaurant with world-class chefs." },
        { icon: <FaSpa />, name: "Luxury Spa", desc: "Rejuvenating treatments and massages." },
        { icon: <FaDumbbell />, name: "Fitness Center", desc: "State-of-the-art gym equipment." },
        { icon: <FaParking />, name: "Valet Parking", desc: "Secure parking for all guests." }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkest mb-12 text-center font-serif">World Class Facilities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((fac, index) => (
                    <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition border border-gray-100 hover:-translate-y-2 group">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition text-4xl">
                            {fac.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-3 text-darkest">{fac.name}</h3>
                        <p className="text-center text-gray-500">{fac.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facilities;
