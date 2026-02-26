package com.example.chat.mapper;

import org.springframework.stereotype.Component;

import com.example.chat.dto.RoomMemberDto;
import com.example.chat.dto.RoomMemberIdDto;
import com.example.chat.dto.RoomMemberUpsertDto;
import com.example.chat.entity.Room;
import com.example.chat.entity.RoomMemberId;
import com.example.chat.entity.RoomMembers;
import com.example.chat.entity.User;

@Component
public class RoomMemberMapper {

  public RoomMemberDto toDto(RoomMembers roomMembers) {
    if (roomMembers == null) {
      return null;
    }

    Long userId = roomMembers.getUser() != null ? roomMembers.getUser().getId() : null;
    Long roomId = roomMembers.getRoom() != null ? roomMembers.getRoom().getId() : null;

    return RoomMemberDto.builder()
        .userId(userId)
        .roomId(roomId)
        .role(roomMembers.getRole())
        .status(roomMembers.getStatus())
        .build();
  }

  public RoomMemberIdDto toIdDto(RoomMemberId roomMemberId) {
    if (roomMemberId == null) {
      return null;
    }

    return RoomMemberIdDto.builder()
        .userId(roomMemberId.getUserId())
        .roomId(roomMemberId.getRoomId())
        .build();
  }

  public RoomMemberId toIdEntity(RoomMemberIdDto dto) {
    if (dto == null) {
      return null;
    }

    return new RoomMemberId(dto.getUserId(), dto.getRoomId());
  }

  public RoomMembers toEntity(RoomMemberUpsertDto dto, User user, Room room) {
    if (dto == null) {
      return null;
    }

    RoomMemberId id = new RoomMemberId(dto.getUserId(), dto.getRoomId());

    return RoomMembers.builder()
        .id(id)
        .user(user)
        .room(room)
        .role(dto.getRole())
        .status(dto.getStatus())
        .build();
  }

  public void updateEntityFromUpsertDto(RoomMemberUpsertDto dto, RoomMembers roomMembers, User user, Room room) {
    if (dto == null || roomMembers == null) {
      return;
    }

    roomMembers.setId(new RoomMemberId(dto.getUserId(), dto.getRoomId()));
    roomMembers.setUser(user);
    roomMembers.setRoom(room);
    roomMembers.setRole(dto.getRole());
    roomMembers.setStatus(dto.getStatus());
  }
}
