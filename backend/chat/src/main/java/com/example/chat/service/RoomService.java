package com.example.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.chat.dto.RoomCreateDto;
import com.example.chat.dto.RoomDto;
import com.example.chat.entity.Room;
import com.example.chat.exception.CustomException;
import com.example.chat.mapper.RoomMapper;
import com.example.chat.repository.RoomRepository;

@Service
public class RoomService {

  private final RoomRepository roomRepository;
  private final RoomMapper roomMapper;

  public RoomService(RoomRepository roomRepository, RoomMapper roomMapper) {
    this.roomRepository = roomRepository;
    this.roomMapper = roomMapper;
  }

  public RoomDto createRoom(RoomCreateDto request) {
    if (roomRepository.existsByName(request.getName())) {
      throw new CustomException("Room with this name already exists!", 400);
    }
    Room room = roomMapper.toEntity(request);
    Room savedRoom = roomRepository.save(room);
    return roomMapper.toDto(savedRoom);
  }

  public List<RoomDto> getAllRooms() {
    return roomRepository.findAll().stream()
        .map(roomMapper::toDto)
        .collect(Collectors.toList());
  }

  public RoomDto getRoomById(Long id) {
    Room room = roomRepository.findById(id)
        .orElseThrow(() -> new CustomException("Room not found!", 404));
    return roomMapper.toDto(room);
  }
}