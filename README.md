# 🏨 Hotel Booking Application

A full-stack hotel reservation system with secure JWT authentication, Spring Boot REST API, and React TypeScript frontend.

## 🛠️ Tech Stack

**Backend:**
- Java 21 & Spring Boot 4.0.2
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0+
- Maven

**Frontend:**
- React 19 with TypeScript
- Vite
- React Router
- Bootstrap 5
- Axios

## ✨ Features

- User registration & JWT authentication
- Browse and search available rooms
- Create and manage hotel bookings
- Admin panel for room management
- Date range filtering

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL 8.0+
- Maven

### Backend Setup

```bash
cd hotel-booking-backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking_db
spring.datasource.username=hotel_user
spring.datasource.password=your_password

# Build and run
mvn clean install
mvn spring-boot:run
```

Server runs on `http://localhost:9192`

### Frontend Setup

```bash
cd hotel-booking-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔌 Main API Endpoints

```
POST   /api/auth/register        - Register user
POST   /api/auth/login           - Login user
GET    /api/rooms                - Get all rooms
GET    /api/rooms/{id}           - Get room details
POST   /api/bookings             - Create booking
GET    /api/bookings             - Get user bookings
```

## 🔒 Security

- Passwords encrypted with BCrypt
- JWT token-based authentication
- Role-based access control (USER/ADMIN)
