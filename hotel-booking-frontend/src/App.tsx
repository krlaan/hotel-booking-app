import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavBar from "./components/layout/NavBar.tsx";
import Footer from "./components/layout/Footer.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import routes from "./router";

function App() {
  return (
    <>
        <AuthProvider>
            <Router>
                <NavBar />
                <main>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    </>
  )
}

export default App
