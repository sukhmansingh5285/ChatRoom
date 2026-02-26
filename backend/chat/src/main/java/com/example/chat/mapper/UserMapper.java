package com.example.chat.mapper;

import org.springframework.stereotype.Component;

import com.example.chat.dto.LoginRequestDto;
import com.example.chat.dto.RegisterRequestDto;
import com.example.chat.dto.UserCreateDto;
import com.example.chat.dto.UserDto;
import com.example.chat.entity.User;

@Component
public class UserMapper {

  public UserDto toDto(User user) {
    if (user == null) {
      return null;
    }

    return UserDto.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .build();
  }

  public User toEntity(UserCreateDto dto) {
    if (dto == null) {
      return null;
    }

    return User.builder()
        .name(dto.getName())
        .email(dto.getEmail())
        .password(dto.getPassword())
        .build();
  }

  public User toEntity(RegisterRequestDto dto) {
    if (dto == null) {
      return null;
    }

    return User.builder()
        .name(dto.getName())
        .email(dto.getEmail())
        .password(dto.getPassword())
        .build();
  }

  public User toAuthEntity(LoginRequestDto dto) {
    if (dto == null) {
      return null;
    }

    return User.builder()
        .email(dto.getEmail())
        .password(dto.getPassword())
        .build();
  }

  public void updateEntityFromCreateDto(UserCreateDto dto, User user) {
    if (dto == null || user == null) {
      return;
    }

    if (dto.getName() != null)
      user.setName(dto.getName());
    if (dto.getEmail() != null)
      user.setEmail(dto.getEmail());
    if (dto.getPassword() != null)
      user.setPassword(dto.getPassword());
  }
}
