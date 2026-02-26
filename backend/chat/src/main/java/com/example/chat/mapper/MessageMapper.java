package com.example.chat.mapper;

import org.springframework.stereotype.Component;

import com.example.chat.dto.MessageCreateDto;
import com.example.chat.dto.MessageDto;
import com.example.chat.entity.Message;
import com.example.chat.entity.Room;
import com.example.chat.entity.User;

@Component
public class MessageMapper {

  public MessageDto toDto(Message message) {
    if (message == null) {
      return null;
    }

    Long roomId = message.getRoom() != null ? message.getRoom().getId() : null;
    Long senderId = message.getSender() != null ? message.getSender().getId() : null;

    return MessageDto.builder()
        .id(message.getId())
        .content(message.getContent())
        .timestamp(message.getTimestamp())
        .roomId(roomId)
        .senderId(senderId)
        .build();
  }

  public Message toEntity(MessageCreateDto dto, Room room, User sender) {
    if (dto == null) {
      return null;
    }

    return Message.builder()
        .content(dto.getContent())
        .room(room)
        .sender(sender)
        .build();
  }
}
