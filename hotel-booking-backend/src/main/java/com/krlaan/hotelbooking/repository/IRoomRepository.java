package com.krlaan.hotelbooking.repository;

import com.krlaan.hotelbooking.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoomRepository extends JpaRepository<Room, Long> {
}
