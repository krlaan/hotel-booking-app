package com.krlaan.hotelbooking.controller;

import com.krlaan.hotelbooking.exception.PhotoRetrievalException;
import com.krlaan.hotelbooking.exception.ResourceNotFoundException;
import com.krlaan.hotelbooking.model.BookedRoom;
import com.krlaan.hotelbooking.model.Room;
import com.krlaan.hotelbooking.response.RoomResponse;
import com.krlaan.hotelbooking.service.IBookingService;
import com.krlaan.hotelbooking.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

// Allow CORS requests from the React frontend running on localhost:5173
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    private final IRoomService roomService;
    private final IBookingService bookingService;

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException, ResourceNotFoundException, PhotoRetrievalException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = convertToRoomResponsesWithPhotos(rooms);

        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId) throws ResourceNotFoundException {
        Optional<Room> room = roomService.getRoomById(roomId);

        return room.map(r -> {
            RoomResponse roomResponse = getRoomResponse(r);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) throws SQLException, ResourceNotFoundException {

        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);

        List<RoomResponse> roomResponses = convertToRoomResponsesWithPhotos(availableRooms);

        if (roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") Double roomPrice) throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);

        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long roomId,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) Double roomPrice,
            @RequestParam(required = false) MultipartFile photo) throws SQLException, IOException, ResourceNotFoundException {

        byte[] photoBytes = photo != null && !photo.isEmpty() ?
                photo.getBytes() : roomService.getRoomPhotoByRoomId(roomId);

        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;

        Room room = roomService.updateRoom(roomId, roomType, roomPrice, photoBytes);
        room.setPhoto(photoBlob);

        RoomResponse response = getRoomResponse(room);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("roomId") Long roomId) {
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private List<RoomResponse> convertToRoomResponsesWithPhotos(List<Room> availableRooms) throws SQLException, ResourceNotFoundException {
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return roomResponses;
    }

    private RoomResponse getRoomResponse(Room room) throws PhotoRetrievalException {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());

//        List<BookingResponse> bookingInfo = bookings.
//                stream().
//                map(booking -> new BookingResponse(booking.getBookingId(),
//                        booking.getCheckInDate(),
//                        booking.getCheckOutDate(),
//                        booking.getBookingConfirmationCode()))
//                .toList();

        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();

        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());

            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }

        return new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }
}
