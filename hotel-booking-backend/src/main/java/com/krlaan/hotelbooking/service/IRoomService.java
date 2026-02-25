package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IRoomService {

    List<Room> getAllRooms();

    Optional<Room> getRoomById(Long roomId);

    List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    List<String> getAllRoomTypes();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException, ResourceNotFoundException;

    Room addNewRoom(MultipartFile photo, String roomType, Double roomPrice) throws SQLException, IOException;

    Room updateRoom(Long roomId, String roomType, Double roomPrice, byte[] photoBytes) throws ResourceNotFoundException;

    void deleteRoom(Long roomId);
}
