package com.example.chat.dto;

import com.example.chat.entity.Role;
import com.example.chat.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMemberDto {

  private Long userId;
  private Long roomId;
  private Role role;
  private Status status;
}
