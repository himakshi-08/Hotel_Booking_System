import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  FaCalendarAlt,
  FaUser,
  FaCreditCard,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const Bookings = () => {
  const { user, loading } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'my-bookings'
  const [bookings, setBookings] = useState([]);

  // Form State
  const [selectedRoom, setSelectedRoom] = useState(
    location.state?.room || null
  );
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // wait until auth state is resolved (if you later set loading true for async checks)
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [user, loading, navigate]);

  const fetchBookings = () => {
    fetch(`http://localhost:3001/bookings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedRoom) {
      addToast("Please select a room first", "error");
      return;
    }

    const newBooking = {
      userId: user.id,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomImage: selectedRoom.image,
      checkIn,
      checkOut,
      guests,
      totalPrice: selectedRoom.price, // Simplified calculation
      status: "Confirmed",
      paymentMethod,
    };

    fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then(() => {
        addToast("Booking Confirmed!", "success");
        fetchBookings();
        setActiveTab("my-bookings");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      fetch(`http://localhost:3001/bookings/${id}`, { method: "DELETE" }).then(
        () => {
          addToast("Booking Cancelled Successfully", "success");
          fetchBookings();
        }
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-darkest mb-8 text-center font-serif">
        Manage Bookings
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-8 py-3 rounded-full font-bold transition ${
            activeTab === "new"
              ? "bg-primary text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          New Booking
        </button>
        <button
          onClick={() => setActiveTab("my-bookings")}
          className={`px-8 py-3 rounded-full font-bold transition ${
            activeTab === "my-bookings"
              ? "bg-primary text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === "new" && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Book Your Stay
          </h2>
          <form onSubmit={handleBooking} className="space-y-6">
            {selectedRoom ? (
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{selectedRoom.name}</h3>
                  <p className="text-secondary font-bold">
                    ₹{selectedRoom.price} / night
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No room selected</p>
                <button
                  type="button"
                  onClick={() => navigate("/rooms")}
                  className="text-primary font-bold hover:underline"
                >
                  Browse Rooms
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/50 outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Guests
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl flex-1 border border-transparent hover:border-primary/30 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-primary"
                  />
                  <FaCreditCard className="text-gray-500" /> Card
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl flex-1 border border-transparent hover:border-primary/30 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="accent-primary"
                  />
                  <span>💵</span> Pay at Hotel
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-primary/30 text-lg"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}

      {activeTab === "my-bookings" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
              <p className="text-gray-500 text-lg mb-4">
                You haven't made any bookings yet.
              </p>
              <button
                onClick={() => setActiveTab("new")}
                className="text-primary font-bold hover:underline"
              >
                Book your first stay
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-6 items-center border border-gray-100"
              >
                <img
                  src={booking.roomImage}
                  alt={booking.roomName}
                  className="w-full md:w-48 h-32 object-cover rounded-xl"
                />
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold text-darkest">
                    {booking.roomName}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {booking.checkIn} - {booking.checkOut}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUser /> {booking.guests} Guests
                    </span>
                  </div>
                  <p className="text-primary font-bold text-lg">
                    Total: ₹{booking.totalPrice}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit-booking/${booking.id}`)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                    title="Cancel"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;