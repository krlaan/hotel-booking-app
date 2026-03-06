import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllRooms} from "../../services/RoomService.ts";
import {getAllBookings} from "../../services/BookingService.ts";
import {FaBed, FaCalendarCheck} from "react-icons/fa";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRooms: 0,
        totalBookings: 0,
        isLoading: true
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [rooms, bookings] = await Promise.all([
                    getAllRooms(),
                    getAllBookings()
                ]);
                setStats({
                    totalRooms: rooms.length,
                    totalBookings: bookings.length,
                    isLoading: false
                });
            } catch {
                setStats(prev => ({...prev, isLoading: false}));
            }
        };

        void fetchStats();
    }, []);

    return (
        <section className="container mt-5">
            <div className="text-center mb-5">
                <h2 className="hotel-color">Admin Dashboard</h2>
                <p className="text-muted">Manage your hotel operations</p>
            </div>

            {/* Stats Cards */}
            <div className="row mb-5">
                <div className="col-md-6 mb-3">
                    <div className="card text-center shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                        <div className="card-body py-4">
                            <FaBed size={40} className="hotel-color mb-3"/>
                            <h3 className="mb-1">{stats.isLoading ? '...' : stats.totalRooms}</h3>
                            <p className="text-muted mb-0">Total Rooms</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card text-center shadow-sm border-0" style={{backgroundColor: '#f8f9fa'}}>
                        <div className="card-body py-4">
                            <FaCalendarCheck size={40} className="hotel-color mb-3"/>
                            <h3 className="mb-1">{stats.isLoading ? '...' : stats.totalBookings}</h3>
                            <p className="text-muted mb-0">Total Bookings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <Link to="/rooms" className="text-decoration-none">
                        <div className="card shadow-sm border-0 admin-action-card">
                            <div className="card-body text-center py-5">
                                <FaBed size={50} className="hotel-color mb-3"/>
                                <h4 className="hotel-color">Manage Rooms</h4>
                                <p className="text-muted">Add, edit or remove rooms</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-6 mb-3">
                    <Link to="/bookings" className="text-decoration-none">
                        <div className="card shadow-sm border-0 admin-action-card">
                            <div className="card-body text-center py-5">
                                <FaCalendarCheck size={50} className="hotel-color mb-3"/>
                                <h4 className="hotel-color">Manage Bookings</h4>
                                <p className="text-muted">View and manage reservations</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
