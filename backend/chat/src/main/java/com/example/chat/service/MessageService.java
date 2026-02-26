package com.example.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.chat.dto.MessageCreateDto;
import com.example.chat.dto.MessageDto;
import com.example.chat.entity.Message;
import com.example.chat.entity.Room;
import com.example.chat.entity.User;
import com.example.chat.exception.CustomException;
import com.example.chat.mapper.MessageMapper;
import com.example.chat.repository.MessageRepository;
import com.example.chat.repository.RoomRepository;
import com.example.chat.repository.UserRepository;

@Service
public class MessageService {

  private final MessageRepository messageRepository;
  private final RoomRepository roomRepository;
  private final UserRepository userRepository;
  private final MessageMapper messageMapper;

  public MessageService(MessageRepository messageRepository, RoomRepository roomRepository,
      UserRepository userRepository, MessageMapper messageMapper) {
    this.messageRepository = messageRepository;
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
    this.messageMapper = messageMapper;
  }

  // Used by REST API to load previous chat history
  public List<MessageDto> getChatHistory(Long roomId) {
    List<Message> messages = messageRepository.findByRoom_IdOrderByTimestampAsc(roomId);
    return messages.stream().map(messageMapper::toDto).toList();
  }

  // Used by WebSocket to save a new message to the database
  public MessageDto saveMessage(MessageCreateDto request) {
    Room room = roomRepository.findById(request.getRoomId())
        .orElseThrow(() -> new CustomException("Room not found!", 404));

    User sender = userRepository.findById(request.getSenderId())
        .orElseThrow(() -> new CustomException("User not found!", 404));

    Message message = messageMapper.toEntity(request, room, sender);
    Message savedMessage = messageRepository.save(message);
    return messageMapper.toDto(savedMessage);
  }
}