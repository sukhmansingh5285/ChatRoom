package com.example.chat.mapper;

import org.springframework.stereotype.Component;

import com.example.chat.dto.RoomCreateDto;
import com.example.chat.dto.RoomDto;
import com.example.chat.entity.Room;

@Component
public class RoomMapper {

  public RoomDto toDto(Room room) {
    if (room == null) {
      return null;
    }

    return RoomDto.builder()
        .id(room.getId())
        .name(room.getName())
        .description(room.getDescription())
        .build();
  }

  public Room toEntity(RoomCreateDto dto) {
    if (dto == null) {
      return null;
    }

    Room room = new Room();
    room.setName(dto.getName());
    room.setDescription(dto.getDescription());
    return room;
  }

  public void updateEntityFromCreateDto(RoomCreateDto dto, Room room) {
    if (dto == null || room == null) {
      return;
    }

    room.setName(dto.getName());
    room.setDescription(dto.getDescription());
  }
}
