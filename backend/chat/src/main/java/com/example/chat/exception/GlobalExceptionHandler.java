package com.example.chat.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<?> handleCustomException(CustomException ex) {
    Map<String, Object> errorDetails = new HashMap<>();
    errorDetails.put("success", false);
    errorDetails.put("message", ex.getMessage());
    return new ResponseEntity<>(errorDetails, HttpStatus.valueOf(ex.getStatusCode()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
    Map<String, Object> errorDetails = new HashMap<>();
    errorDetails.put("success", false);
    errorDetails.put("message", "Data was not complete or either incorrect");
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleGlobalException(Exception ex) {
    Map<String, Object> errorDetails = new HashMap<>();
    errorDetails.put("success", false);
    errorDetails.put("message", "Internal Server Error");
    return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}