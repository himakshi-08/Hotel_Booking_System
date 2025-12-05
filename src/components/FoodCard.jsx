import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const FoodCard = ({ item, onOrder }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-1 font-bold text-sm rounded-full shadow-lg">
                    ${item.price}
                </div>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-darkest font-serif">{item.name}</h3>
                    <FaUtensils className="text-secondary text-sm mt-1" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                </p>
                <button
                    onClick={() => onOrder(item)}
                    className="w-full mt-2 bg-gray-50 text-secondary hover:bg-secondary hover:text-white py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wider font-bold shadow-sm hover:shadow-md"
                >
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
