# Hotel Booking System

A modern, full-featured hotel booking platform built with React and Vite. Browse rooms, manage bookings, order food, and access premium services with an intuitive user interface.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Pages & Components](#-pages--components)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Room Browsing**: Browse available rooms with detailed information
- **Booking Management**: Create, view, and edit room bookings
- **Dining Services**: Browse and order food from hotel restaurant
- **Service Booking**: Book premium hotel services and facilities
- **User Dashboard**: Personalized dashboard with booking history and orders
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **REST API Integration**: Seamless backend communication with Axios

## 🛠 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS & PostCSS
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Backend Mock**: JSON Server
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FoodCard.jsx      # Food item display card
│   ├── RoomCard.jsx      # Room display card
│   ├── Navbar.jsx        # Navigation bar
│   ├── Footer.jsx        # Footer component
│   └── Toast.jsx         # Toast notification handler
├── context/             # React Context API state management
│   ├── AuthContext.jsx   # Authentication state
│   └── ToastContext.jsx  # Toast notification state
├── pages/               # Page components
│   ├── Home.jsx          # Landing page
│   ├── Rooms.jsx         # Rooms listing
│   ├── RoomDetails.jsx   # Individual room details
│   ├── Dining.jsx        # Food ordering page
│   ├── ServiceBooking.jsx # Service booking page
│   ├── Facilities.jsx    # Hotel facilities page
│   ├── About.jsx         # About page
│   ├── Contact.jsx       # Contact page
│   ├── Login.jsx         # User login
│   ├── Register.jsx      # User registration
│   ├── Bookings.jsx      # View bookings
│   ├── EditBooking.jsx   # Edit existing booking
│   ├── MyOrders.jsx      # View food orders
│   ├── BookingForm.jsx   # Booking form component
│   └── UserDashboard.jsx # User dashboard
├── services/            # API services
│   └── api.js            # Axios API configuration
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## 🚀 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/himakshi-08/Hotel_Booking_System.git
   cd Hotel_Booking_System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **In another terminal, start the JSON Server** (for mock API)
   ```bash
   npx json-server --watch db.json --port 5000
   ```

## 📝 Running the Project

### Development Mode
```bash
npm run dev
```
- Starts Vite dev server with HMR (Hot Module Replacement)
- Access at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
- Creates optimized production build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
- Preview the production build locally

### Lint Code
```bash
npm run lint
```
- Runs ESLint to check code quality

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

## 🔌 Backend & API Documentation

### Backend Setup

This project uses **JSON Server** as a mock backend for development and testing purposes.

#### Starting the Backend Server

1. **Ensure db.json exists** in the project root
2. **Start JSON Server** in a separate terminal:
   ```bash
   npx json-server --watch db.json --port 5000
   ```
   - The API will be available at `http://localhost:5000`
   - Changes to `db.json` are watched in real-time
   - Server supports full CRUD operations

#### db.json Structure

Create a `db.json` file in your project root with the following structure:

```json
{
  "rooms": [
    {
      "id": 1,
      "name": "Deluxe Suite",
      "price": 150,
      "description": "Spacious room with ocean view",
      "image": "url-to-image",
      "capacity": 2
    }
  ],
  "bookings": [
    {
      "id": 1,
      "userId": 1,
      "roomId": 1,
      "checkIn": "2025-12-10",
      "checkOut": "2025-12-12",
      "guests": 2,
      "totalPrice": 300,
      "status": "confirmed"
    }
  ],
  "food": [
    {
      "id": 1,
      "name": "Grilled Salmon",
      "price": 25,
      "description": "Fresh salmon with herbs",
      "image": "url-to-image"
    }
  ],
  "orders": [
    {
      "id": 1,
      "userId": 1,
      "items": [1, 2],
      "totalPrice": 50,
      "orderDate": "2025-12-05",
      "status": "delivered"
    }
  ]
}
```

#### API Base Configuration

- **Base URL**: `http://localhost:5000`
- **HTTP Client**: Axios
- **Default Timeout**: 10000ms
- **Configuration File**: `src/services/api.js`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/rooms` | Fetch all rooms |
| `GET` | `/rooms/:id` | Fetch specific room |
| `POST` | `/bookings` | Create new booking |
| `GET` | `/bookings` | Fetch all bookings |
| `GET` | `/bookings/:id` | Fetch specific booking |
| `PUT` | `/bookings/:id` | Update booking |
| `DELETE` | `/bookings/:id` | Delete booking |
| `GET` | `/food` | Fetch all food items |
| `GET` | `/food/:id` | Fetch specific food item |
| `POST` | `/orders` | Create food order |
| `GET` | `/orders` | Fetch all orders |

#### Frontend API Integration

All API requests are made through `src/services/api.js`:

```javascript
// Example usage in components
import { api } from '../services/api.js';

// Get all rooms
const rooms = await api.get('/rooms');

// Create booking
const booking = await api.post('/bookings', bookingData);

// Update booking
const updated = await api.put('/bookings/1', updatedData);

// Delete booking
await api.delete('/bookings/1');
```

#### Important Notes

- 📝 **Database Persistence**: JSON Server stores data in `db.json`. Restart the server to restore original data
- 🔄 **Real-time Updates**: Changes made through API calls are automatically saved to `db.json`
- 🚀 **Production Deployment**: Replace JSON Server with a real backend (Node.js, Python, etc.) before going live

## 🎨 Pages & Components

### Pages
- **Home**: Landing page with featured content
- **Rooms**: Browse all available rooms
- **Room Details**: Detailed view of a specific room
- **Dining**: Food ordering interface
- **Services**: Premium service booking
- **Facilities**: Hotel facilities showcase
- **Dashboard**: Personalized user dashboard
- **Bookings**: Manage your bookings
- **My Orders**: View your food orders
- **About**: Hotel information
- **Contact**: Contact form
- **Login/Register**: Authentication pages

### Components
- **FoodCard**: Displays food items with details
- **RoomCard**: Displays room information
- **Navbar**: Navigation with menu links
- **Footer**: Site footer
- **Toast**: Notification system

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request


