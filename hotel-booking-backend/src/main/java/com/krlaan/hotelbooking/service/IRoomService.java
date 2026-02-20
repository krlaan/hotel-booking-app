package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService {

    Room addNewRoom(MultipartFile photo, String roomType, Double roomPrice) throws SQLException, IOException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException, ResourceNotFoundException;

    Room updateRoom(Long roomId, String roomType, Double roomPrice, byte[] photoBytes) throws ResourceNotFoundException;

    void deleteRoom(Long roomId);
}
