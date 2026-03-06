package com.krlaan.hotelbooking.controller;

import com.krlaan.hotelbooking.exception.InvalidBookingRequestException;
import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.BookedRoom;
import com.krlaan.hotelbooking.model.Room;
import com.krlaan.hotelbooking.request.BookingRequest;
import com.krlaan.hotelbooking.response.BookedDateRangeResponse;
import com.krlaan.hotelbooking.response.BookingResponse;
import com.krlaan.hotelbooking.response.RoomResponse;
import com.krlaan.hotelbooking.service.IBookingService;
import com.krlaan.hotelbooking.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();

        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }

        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);

        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/room/{roomId}/booked-dates")
    public ResponseEntity<List<BookedDateRangeResponse>> getBookedDatesByRoomId(@PathVariable Long roomId) {
        List<BookedRoom> bookings = bookingService.getBookingsByRoomId(roomId);
        
        List<BookedDateRangeResponse> dateRanges = bookings.stream()
                .map(booking -> new BookedDateRangeResponse(booking.getCheckInDate(), booking.getCheckOutDate()))
                .toList();

        return ResponseEntity.ok(dateRanges);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) throws ResourceNotFoundException {
        BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
        BookingResponse bookingResponse = getBookingResponse(booking);

        return ResponseEntity.ok(bookingResponse);
    }


    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(
            @PathVariable Long roomId,
            @RequestBody BookingRequest bookingRequest) {
        try {
            BookedRoom bookedRoom = new BookedRoom();
            bookedRoom.setCheckInDate(bookingRequest.getCheckInDate());
            bookedRoom.setCheckOutDate(bookingRequest.getCheckOutDate());
            bookedRoom.setGuestFullName(bookingRequest.getGuestFullName());
            bookedRoom.setGuestEmail(bookingRequest.getGuestEmail());
            bookedRoom.setNumOfAdults(bookingRequest.getNumOfAdults());
            bookedRoom.setNumOfChildren(bookingRequest.getNumOfChildren());
            bookedRoom.setTotalNumOfGuest(bookingRequest.getNumOfAdults() + bookingRequest.getNumOfChildren());

            String confirmationCode = bookingService.saveBooking(roomId, bookedRoom);
            return ResponseEntity.ok("Room booked successfully! Your confirmation code is: " + confirmationCode);

        } catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId()).get();

        RoomResponse bookingResponse = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice());

        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                bookingResponse);
    }
}
