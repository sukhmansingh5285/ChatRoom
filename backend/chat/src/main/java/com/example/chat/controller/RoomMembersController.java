package com.example.chat.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.dto.RoomMemberUpsertDto;
import com.example.chat.service.RoomMembersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/room-members")
public class RoomMembersController {

  private final RoomMembersService roomMembersService;

  public RoomMembersController(RoomMembersService roomMembersService) {
    this.roomMembersService = roomMembersService;
  }

  @PostMapping("/join")
  public ResponseEntity<?> joinRoom(@Valid @RequestBody RoomMemberUpsertDto request) {
    return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Successfully joined room!",
        "member", roomMembersService.joinRoom(request)));
  }

  @GetMapping("/room/{roomId}")
  public ResponseEntity<?> getRoomMembers(@PathVariable Long roomId) {
    return ResponseEntity.ok(Map.of("success", true, "members", roomMembersService.getMembersOfRoom(roomId)));
  }
}