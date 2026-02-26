package com.example.chat.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RoomMemberId implements Serializable {

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "room_id", nullable = false)
  private Long roomId;
}
