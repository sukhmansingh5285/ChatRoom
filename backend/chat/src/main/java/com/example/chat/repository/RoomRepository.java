package com.example.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

  boolean existsByName(String name);
}
