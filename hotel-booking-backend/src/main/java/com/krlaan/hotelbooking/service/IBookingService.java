package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.BookedRoom;

import java.util.List;

public interface IBookingService {

    List<BookedRoom> getAllBookings();

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode) throws ResourceNotFoundException;

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);


}
