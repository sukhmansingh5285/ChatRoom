package com.example.chat.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageCreateDto {

  @NotBlank
  @Size(max = 2000)
  private String content;

  @NotNull
  @Min(1)
  private Long roomId;

  @NotNull
  @Min(1)
  private Long senderId;
}
