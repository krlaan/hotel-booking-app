import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Rooms from "./components/room/Rooms.tsx";
import Home from "./components/home/Home.tsx";
import EditRoom from "./components/room/EditRoom.tsx";
import AddRoom from "./components/room/AddRoom.tsx";

function App() {
  return (
    <>
        <main>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit-room/:roomId" element={<EditRoom />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/add-room" element={<AddRoom />} />
                </Routes>
            </Router>
        </main>
    </>
  )
}

export default App
