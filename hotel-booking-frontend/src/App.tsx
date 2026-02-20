import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Rooms from "./components/room/Rooms.tsx";
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
                    <Route path="/rooms" element={<Rooms />} />
                </Routes>
            </Router>
        </main>
    </>
  )
}

export default App
