package com.example.chat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.dto.LoginRequestDto;
import com.example.chat.dto.RegisterRequestDto;
import com.example.chat.dto.UserDto;
import com.example.chat.entity.User;
import com.example.chat.mapper.UserMapper;
import com.example.chat.service.UserService;
import com.example.chat.util.JwtUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;
  private final JwtUtils jwtUtils;
  private final UserMapper userMapper;

  @Value("${jwt.cookieName:jwt}")
  private String jwtCookieName;

  @Value("${jwt.cookieSecure:false}")
  private boolean jwtCookieSecure;

  @Value("${jwt.cookieSameSite:Lax}")
  private String jwtCookieSameSite;

  @Value("${jwt.cookieMaxAge:86400}")
  private long jwtCookieMaxAge;

  public UserController(UserService userService, JwtUtils jwtUtils, UserMapper userMapper) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
    this.userMapper = userMapper;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDto request) {
    UserDto user = userService.register(request);
    return sendToken(user, HttpStatus.CREATED, "User Registered!");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto request) {
    UserDto user = userService.login(request);
    return sendToken(user, HttpStatus.OK, "User Logged In!");
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logout() {
    ResponseCookie cookie = ResponseCookie.from(jwtCookieName, "")
        .httpOnly(true)
        .secure(jwtCookieSecure)
        .path("/")
        .sameSite(jwtCookieSameSite)
        .maxAge(0)
        .build();

    return ResponseEntity.ok()
        .header("Set-Cookie", cookie.toString())
        .body(Map.of("success", true, "message", "Logged Out Successfully."));
  }

  @GetMapping("/getuser")
  public ResponseEntity<?> getUser(@AuthenticationPrincipal User user) {
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("success", false, "message", "Unauthorized: User not authenticated."));
    }
    UserDto userDto = userMapper.toDto(user);
    return ResponseEntity.ok(Map.of("success", true, "user", userDto));
  }

  private ResponseEntity<?> sendToken(UserDto user, HttpStatus status, String message) {
    String token = jwtUtils.generateToken(user.getEmail());

    ResponseCookie cookie = ResponseCookie.from(jwtCookieName, token)
        .httpOnly(true)
        .secure(jwtCookieSecure)
        .path("/")
        .sameSite(jwtCookieSameSite)
        .maxAge(jwtCookieMaxAge)
        .build();

    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("success", true);
    responseBody.put("message", message);
    responseBody.put("user", user);

    return ResponseEntity.status(status)
        .header("Set-Cookie", cookie.toString())
        .body(responseBody);
  }
}