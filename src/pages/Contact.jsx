import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkest mb-12 text-center font-serif">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Address</h3>
                                    <p className="text-gray-600">123 Ocean Drive, Beach Paradise, Mumbai 400001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <FaPhone className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Phone</h3>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email</h3>
                                    <p className="text-gray-600">info@grandhorizon.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Send Message</h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                            <input type="text" className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your Email" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none h-32" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-primary/30">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Google Map */}
            <div className="mt-12 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <h2 className="text-2xl font-bold mb-6 text-primary text-center">Find Us</h2>
                <div className="w-full h-96 rounded-2xl overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7634891234567!2d72.8261!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNDknMzQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="COCO Hotel Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
