package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.Booking;

import java.util.List;

public interface IBookingService {

    List<Booking> getAllBookings();

    List<Booking> getBookingsByUserEmail(String email);

    List<Booking> getBookingsByRoomId(Long roomId);

    Booking findByBookingConfirmationCode(String confirmationCode) throws ResourceNotFoundException;

    String saveBooking(Long roomId, Booking bookingRequest);

    void cancelBooking(Long bookingId);
}
