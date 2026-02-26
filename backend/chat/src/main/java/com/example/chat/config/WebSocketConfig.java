package com.example.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // The endpoint our frontend (React) will use to connect:
    // ws://localhost:8071/ws-chat
    registry.addEndpoint("/ws-chat")
        .setAllowedOrigins("http://localhost:3000")
        .withSockJS(); // Fallback for browsers that don't support WebSockets
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // Prefix for messages sent from server to client
    registry.enableSimpleBroker("/topic");

    // Prefix for messages sent from client to server (e.g., /app/chat.sendMessage)
    registry.setApplicationDestinationPrefixes("/app");
  }
}