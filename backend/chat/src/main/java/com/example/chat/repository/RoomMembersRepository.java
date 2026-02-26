package com.example.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chat.entity.RoomMemberId;
import com.example.chat.entity.RoomMembers;
import com.example.chat.entity.Status;

public interface RoomMembersRepository extends JpaRepository<RoomMembers, RoomMemberId> {

  List<RoomMembers> findByRoom_Id(Long roomId);

  List<RoomMembers> findByRoom_IdAndStatus(Long roomId, Status status);

  List<RoomMembers> findByUser_Id(Long userId);

  Optional<RoomMembers> findByUser_IdAndRoom_Id(Long userId, Long roomId);

  boolean existsByUser_IdAndRoom_Id(Long userId, Long roomId);

  void deleteByUser_IdAndRoom_Id(Long userId, Long roomId);
}
