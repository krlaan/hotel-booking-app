package com.krlaan.hotelbooking.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private Double roomPrice;
    private boolean isBooked = false;
    private String photo;
    private List<BookingResponse> bookings;

    public RoomResponse(Long id, String roomType, Double roomPrice) {
        this.roomPrice = roomPrice;
        this.roomType = roomType;
        this.id = id;
    }

    public RoomResponse(Long id, String roomType, Double roomPrice, boolean isBooked,
                        byte[] photoBytes) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
//        this.bookings = bookings;
    }
}
