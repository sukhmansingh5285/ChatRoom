package com.example.chat.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.service.MessageService;

@RestController
@RequestMapping("/api/message")
public class MessageController {

  private final MessageService messageService;

  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  // This endpoint will be called by your React frontend right when they open a
  // Room
  @GetMapping("/history/{roomId}")
  public ResponseEntity<?> getChatHistory(@PathVariable Long roomId) {
    return ResponseEntity.ok(Map.of(
        "success", true,
        "messages", messageService.getChatHistory(roomId)));
  }
}