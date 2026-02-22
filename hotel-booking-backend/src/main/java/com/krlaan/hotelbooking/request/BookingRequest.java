package com.krlaan.hotelbooking.request;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private String guestFullName;
    private String guestEmail;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numOfAdults;
    private int numOfChildren;
}
