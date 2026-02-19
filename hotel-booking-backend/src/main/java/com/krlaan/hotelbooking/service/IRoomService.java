package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

public interface IRoomService {

    Room addNewRoom(MultipartFile photo, String roomType, Double roomPrice) throws SQLException, IOException;
}
