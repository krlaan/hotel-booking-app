import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Rooms from "./components/room/Rooms.tsx";
import Home from "./components/home/Home.tsx";
import EditRoom from "./components/room/EditRoom.tsx";
import AddRoom from "./components/room/AddRoom.tsx";
import NavBar from "./components/layout/NavBar.tsx";
import Footer from "./components/layout/Footer.tsx";
import RoomListing from "./components/room/RoomListing.tsx";

function App() {
  return (
    <>
        <Router>
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit-room/:roomId" element={<EditRoom />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/add-room" element={<AddRoom />} />
                    <Route path="/browse-all-rooms" element={<RoomListing />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    </>
  )
}

export default App
