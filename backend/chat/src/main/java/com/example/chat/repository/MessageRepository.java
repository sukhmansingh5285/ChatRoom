package com.example.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

  List<Message> findByRoom_IdOrderByTimestampAsc(Long roomId);

  List<Message> findBySender_IdOrderByTimestampAsc(Long senderId);

  void deleteByRoom_Id(Long roomId);
}
