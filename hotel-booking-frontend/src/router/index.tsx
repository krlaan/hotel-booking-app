import type { ReactNode } from 'react';
import Home from '../components/home/Home.tsx';
import Rooms from '../components/room/Rooms.tsx';
import EditRoom from '../components/room/EditRoom.tsx';
import AddRoom from '../components/room/AddRoom.tsx';
import RoomListing from '../components/room/RoomListing.tsx';
import Admin from '../components/admin/Admin.tsx';
import Checkout from '../components/booking/Checkout.tsx';
import BookingSuccess from '../components/booking/BookingSuccess.tsx';
import Bookings from '../components/booking/Bookings.tsx';
import FindBooking from '../components/booking/FindBooking.tsx';
import Login from '../components/auth/Login.tsx';
import Registration from '../components/auth/Registration.tsx';
import Profile from '../components/auth/Profile.tsx';
import Logout from '../components/auth/Logout.tsx';
import RequireAuth from '../components/auth/RequireAuth.tsx';

export interface RouteConfig {
    path: string;
    element: ReactNode;
    meta?: {
        requiresAuth?: boolean;
    };
}

const routes: RouteConfig[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/rooms',
        element: <Rooms />
    },
    {
        path: '/edit-room/:roomId',
        element: <EditRoom />
    },
    {
        path: '/add-room',
        element: <AddRoom />
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
        element: <Admin />
    },
    {
        path: '/booking-success',
        element: <BookingSuccess />
    },
    {
        path: '/bookings',
        element: <Bookings />
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
        element: <Profile />
    },
    {
        path: '/logout',
        element: <Logout />
    }
];

export default routes;
