package com.example.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.chat.dto.RoomMemberDto;
import com.example.chat.dto.RoomMemberUpsertDto;
import com.example.chat.entity.Room;
import com.example.chat.entity.RoomMembers;
import com.example.chat.entity.User;
import com.example.chat.exception.CustomException;
import com.example.chat.mapper.RoomMemberMapper;
import com.example.chat.repository.RoomMembersRepository;
import com.example.chat.repository.RoomRepository;
import com.example.chat.repository.UserRepository;

@Service
public class RoomMembersService {

  private final RoomMembersRepository roomMembersRepository;
  private final UserRepository userRepository;
  private final RoomRepository roomRepository;
  private final RoomMemberMapper roomMemberMapper;

  public RoomMembersService(RoomMembersRepository roomMembersRepository, UserRepository userRepository,
      RoomRepository roomRepository, RoomMemberMapper roomMemberMapper) {
    this.roomMembersRepository = roomMembersRepository;
    this.userRepository = userRepository;
    this.roomRepository = roomRepository;
    this.roomMemberMapper = roomMemberMapper;
  }

  public RoomMemberDto joinRoom(RoomMemberUpsertDto request) {
    User user = userRepository.findById(request.getUserId())
        .orElseThrow(() -> new CustomException("User not found!", 404));

    Room room = roomRepository.findById(request.getRoomId())
        .orElseThrow(() -> new CustomException("Room not found!", 404));

    if (roomMembersRepository.existsByUser_IdAndRoom_Id(user.getId(), room.getId())) {
      throw new CustomException("User is already a member of this room!", 400);
    }

    RoomMembers roomMember = roomMemberMapper.toEntity(request, user, room);
    RoomMembers savedMember = roomMembersRepository.save(roomMember);
    return roomMemberMapper.toDto(savedMember);
  }

  public List<RoomMemberDto> getMembersOfRoom(Long roomId) {
    return roomMembersRepository.findByRoom_Id(roomId).stream()
        .map(roomMemberMapper::toDto)
        .collect(Collectors.toList());
  }
}