package com.krlaan.hotelbooking.repository;

import com.krlaan.hotelbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    List<Booking> findByGuestEmail(String email);

    List<Booking> findByRoomId(Long roomId);
}
