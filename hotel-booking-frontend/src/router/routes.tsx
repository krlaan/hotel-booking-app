import type { ReactNode } from 'react';
import Home from '../components/home/Home.tsx';
import RoomsManagement from '../components/room/RoomsManagement.tsx';
import EditRoom from '../components/room/EditRoom.tsx';
import AddRoom from '../components/room/AddRoom.tsx';
import RoomListing from '../components/room/RoomListing.tsx';
import AdminDashboard from '../components/admin/AdminDashboard.tsx';
import Checkout from '../components/booking/Checkout.tsx';
import BookingSuccess from '../components/booking/BookingSuccess.tsx';
import Bookings from '../components/booking/Bookings.tsx';
import FindBooking from '../components/booking/FindBooking.tsx';
import Login from '../components/auth/Login.tsx';
import Registration from '../components/auth/Registration.tsx';
import Profile from '../components/auth/Profile.tsx';
import Logout from '../components/auth/Logout.tsx';
import RequireAuth from '../components/auth/RequireAuth.tsx';
import RequireAdminAuth from '../components/auth/RequireAdminAuth.tsx';

export interface RouteConfig {
    path: string;
    element: ReactNode;
    meta?: {
        requiresAuth?: boolean;
        requiresAdmin?: boolean;
    };
}

const routes: RouteConfig[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/rooms',
        element: (
            <RequireAdminAuth>
                <RoomsManagement />
            </RequireAdminAuth>
        ),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/edit-room/:roomId',
        element: (
            <RequireAdminAuth>
                <EditRoom />
            </RequireAdminAuth>
        ),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/add-room',
        element: (
            <RequireAdminAuth>
                <AddRoom />
            </RequireAdminAuth>
        ),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/book-room/:roomId',
        element: (
            <RequireAuth>
                <Checkout />
            </RequireAuth>
        ),
        meta: { requiresAuth: true }
    },
    {
        path: '/browse-all-rooms',
        element: <RoomListing />
    },
    {
        path: '/admin',
        element: (
            <RequireAdminAuth>
                <AdminDashboard />
            </RequireAdminAuth>
        ),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/booking-success',
        element: <BookingSuccess />
    },
    {
        path: '/bookings',
        element: (
            <RequireAdminAuth>
                <Bookings />
            </RequireAdminAuth>
        ),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/find-booking',
        element: <FindBooking />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Registration />
    },
    {
        path: '/profile',
        element: (
            <RequireAuth>
                <Profile />
            </RequireAuth>
        ),
        meta: { requiresAuth: true }
    },
    {
        path: '/logout',
        element: <Logout />
    }
];

export default routes;
