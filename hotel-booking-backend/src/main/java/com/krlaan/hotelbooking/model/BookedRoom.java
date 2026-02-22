package com.krlaan.hotelbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoom {

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

    public void calculateTotalNumOfGuest() {
        if (this.numOfAdults != null && this.numOfChildren != null) {
            this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
        }
    }

    public void setNumOfAdults(Integer numOfAdults) {
        this.numOfAdults = numOfAdults;
        if (numOfAdults != null) {
            calculateTotalNumOfGuest();
        }
    }

    public void setNumOfChildren(Integer numOfChildren) {
        this.numOfChildren = numOfChildren;
        if (numOfChildren != null) {
            calculateTotalNumOfGuest();
        }
    }
}
