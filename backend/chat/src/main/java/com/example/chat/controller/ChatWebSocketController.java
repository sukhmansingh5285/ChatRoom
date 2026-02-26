package com.example.chat.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.chat.dto.MessageDto;
import com.example.chat.dto.MessageCreateDto;
import com.example.chat.service.MessageService;

@Controller
public class ChatWebSocketController {

  private final MessageService messageService;

  public ChatWebSocketController(MessageService messageService) {
    this.messageService = messageService;
  }

  // React sends message to: /app/chat.sendMessage/{roomId}
  @MessageMapping("/chat.sendMessage/{roomId}")
  // Server broadcasts it to: /topic/room/{roomId}
  @SendTo("/topic/room/{roomId}")
  public MessageDto sendMessage(@DestinationVariable Long roomId, @Payload MessageCreateDto messageCreateDto) {
    // Ensure the ID in the path matches the DTO
    messageCreateDto.setRoomId(roomId);

    // Saves to DB and returns the mapped Object (with Sender Name) to be
    // broadcasted instantly
    return messageService.saveMessage(messageCreateDto);
  }
}