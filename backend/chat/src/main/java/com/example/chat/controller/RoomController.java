package com.example.chat.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.dto.RoomCreateDto;
import com.example.chat.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/room")
public class RoomController {

  private final RoomService roomService;

  public RoomController(RoomService roomService) {
    this.roomService = roomService;
  }

  @PostMapping("/create")
  public ResponseEntity<?> createRoom(@Valid @RequestBody RoomCreateDto request) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(Map.of("success", true, "message", "Room Created!", "room", roomService.createRoom(request)));
  }

  @GetMapping("/getall")
  public ResponseEntity<?> getAllRooms() {
    return ResponseEntity.ok(Map.of("success", true, "rooms", roomService.getAllRooms()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getRoomById(@PathVariable Long id) {
    return ResponseEntity.ok(Map.of("success", true, "room", roomService.getRoomById(id)));
  }
}