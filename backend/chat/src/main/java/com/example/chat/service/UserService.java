package com.example.chat.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chat.dto.LoginRequestDto;
import com.example.chat.dto.RegisterRequestDto;
import com.example.chat.dto.UserDto;
import com.example.chat.entity.User;
import com.example.chat.exception.CustomException;
import com.example.chat.mapper.UserMapper;
import com.example.chat.repository.UserRepository;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper userMapper;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.userMapper = userMapper;
  }

  public UserDto register(RegisterRequestDto request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new CustomException("Email already registered!", 400);
    }

    User user = userMapper.toEntity(request);
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    User savedUser = userRepository.save(user);
    return userMapper.toDto(savedUser);
  }

  public UserDto login(LoginRequestDto request) {
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new CustomException("Invalid Email Or Password.", 400));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new CustomException("Invalid Email Or Password.", 400);
    }

    return userMapper.toDto(user);
  }

  public UserDto getUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new CustomException("User not found with ID: " + id, 404));
    return userMapper.toDto(user);
  }
}