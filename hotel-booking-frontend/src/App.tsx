import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ExistingRooms from "./components/room/ExistingRooms.tsx";
import Home from "./components/home/Home.tsx";
import EditRoom from "./components/room/EditRoom.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
        <main>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit-room/:roomId" element={<EditRoom />} />
                    <Route path="/existing-rooms" element={<ExistingRooms />} />
                </Routes>
            </Router>
        </main>
    </>
  )
}

export default App
