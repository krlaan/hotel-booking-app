package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.model.BookedRoom;

import java.util.List;

public interface IBookingService {

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();
}
