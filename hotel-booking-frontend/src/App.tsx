import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Rooms from "./components/room/Rooms.tsx";
import Home from "./components/home/Home.tsx";
import EditRoom from "./components/room/EditRoom.tsx";
import AddRoom from "./components/room/AddRoom.tsx";
import NavBar from "./components/layout/NavBar.tsx";
import Footer from "./components/layout/Footer.tsx";
import RoomListing from "./components/room/RoomListing.tsx";
import Admin from "./components/admin/Admin.tsx";
import Checkout from "./components/booking/Checkout.tsx";
import BookingSuccess from "./components/booking/BookingSuccess.tsx";
import Bookings from "./components/booking/Bookings.tsx";
import FindBooking from "./components/booking/FindBooking.tsx";
import Login from "./components/auth/Login.tsx";
import Registration from "./components/auth/Registration.tsx";
import Profile from "./components/auth/Profile.tsx";
import Logout from "./components/auth/Logout.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";

function App() {
  return (
    <>
        <AuthProvider>
            <Router>
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/edit-room/:roomId" element={<EditRoom />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/add-room" element={<AddRoom />} />

                        <Route
                            path="/book-room/:roomId"
                            element={
                                <RequireAuth>
                                    <Checkout />
                                </RequireAuth>
                            }
                        />
                        <Route path="/browse-all-rooms" element={<RoomListing />} />

                        <Route path="/admin" element={<Admin />} />
                        <Route path="/booking-success" element={<BookingSuccess />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/find-booking" element={<FindBooking />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    </>
  )
}

export default App
