package com.example.chat.dto;

import com.example.chat.entity.Role;
import com.example.chat.entity.Status;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMemberUpsertDto {

  @NotNull
  @Min(1)
  private Long userId;

  @NotNull
  @Min(1)
  private Long roomId;

  @NotNull
  private Role role;

  @NotNull
  private Status status;
}
