package com.krlaan.hotelbooking.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "booked_room")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_in")
    private LocalDate checkInDate;

    @Column(name = "check_out")
    private LocalDate checkOutDate;

    @Column(name = "guest_fullname")
    private String guestFullName;

    @Column(name = "guest_email")
    private String guestEmail;

    @Column(name = "adults")
    private Integer numOfAdults;

    @Column(name = "children")
    private Integer numOfChildren;

    @Column(name = "total_guest")
    private Integer totalNumOfGuest;

    @Setter
    @Column(name = "confirmation_code")
    private String bookingConfirmationCode;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @PrePersist
    @PreUpdate
    public void calculateTotalNumOfGuest() {
        if (this.numOfAdults != null && this.numOfChildren != null) {
            this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
        }
    }
}