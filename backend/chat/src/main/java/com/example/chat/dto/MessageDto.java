package com.example.chat.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

  private Long id;
  private String content;
  private LocalDateTime timestamp;
  private Long roomId;
  private Long senderId;
  private String senderName;
}
