package com.example.chat.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateDto {

  @NotBlank
  @Size(min = 2, max = 100)
  private String name;

  @NotBlank
  @Size(min = 3, max = 500)
  private String description;
}
