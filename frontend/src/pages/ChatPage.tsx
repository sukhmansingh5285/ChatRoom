import { useEffect, useRef, useState } from 'react'
import type { Client } from '@stomp/stompjs'
import * as userApi from '../api/userApi.ts'
import * as roomApi from '../api/roomApi.ts'
import * as roomMembersApi from '../api/roomMembersApi.ts'
import * as messageApi from '../api/messageApi.ts'
import { connectToRoom } from '../chat/socket.ts'
import { AuthCard } from '../components/auth/AuthCard.tsx'
import { RoomSidebar } from '../components/chat/RoomSidebar.tsx'
import { ChatArea } from '../components/chat/ChatArea.tsx'
import type { User, Room, RoomMember, Message } from '../types/chat.ts'

type ApiError = {
  response?: {
    data?: {
      message?: string
    }
  }
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== 'object' || error === null) return fallback

  const apiError = error as ApiError
  const message = apiError.response?.data?.message

  if (typeof message === 'string' && message.trim()) {
    return message
  }

  return fallback
}

export const ChatPage = () => {
  // ---- Auth state ----
  const [user, setUser] = useState<User | null>(null)

  // ---- Room state ----
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null)
  const [roomName, setRoomName] = useState('')
  const [roomDesc, setRoomDesc] = useState('')

  // ---- Chat state ----
  const [messages, setMessages] = useState<Message[]>([])
  const [members, setMembers] = useState<RoomMember[]>([])
  const [messageText, setMessageText] = useState('')

  // ---- Shared UI state ----
  const [error, setError] = useState('')

  // ---- WebSocket ref ----
  const clientRef = useRef<Client | null>(null)

  // ---- Actions ----

  const loadRooms = async () => {
    try {
      const data = await roomApi.getAllRooms()
      setRooms(data.rooms)
    } catch {
      setError('Could not load rooms')
    }
  }

  // On first load, check if user is already logged in (cookie)
  useEffect(() => {
    userApi.getCurrentUser()
      .then((data) => { if (data?.success) setUser(data.user) })
      .catch(() => {})
  }, [])

  // When user logs in, load rooms
  useEffect(() => {
    if (!user) return
    roomApi.getAllRooms()
      .then((data) => setRooms(data.rooms))
      .catch(() => setError('Could not load rooms'))
  }, [user])

  // When a room is selected, load its history + members + connect websocket
  useEffect(() => {
    if (!user || !selectedRoomId) return

    // Disconnect previous socket
    if (clientRef.current) {
      clientRef.current.deactivate()
      clientRef.current = null
    }

    // Fetch history and members
    messageApi.getHistory(selectedRoomId)
      .then((data) => setMessages(data.messages))
      .catch(() => setError('Could not load messages'))
    roomMembersApi.getRoomMembers(selectedRoomId)
      .then((data) => setMembers(data.members))
      .catch(() => setError('Could not load members'))

    // Connect websocket for live messages
    connectToRoom(selectedRoomId, (msg) => {
      setMessages((prev) => [...prev, msg])
    }).then((client) => {
      clientRef.current = client
    }).catch(() => setError('WebSocket connection failed'))

    // Cleanup on room change
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate()
        clientRef.current = null
      }
    }
  }, [selectedRoomId, user])

  const handleLogin = async (email: string, password: string) => {
    try {
      setError('')
      const data = await userApi.login(email, password)
      setUser(data.user)
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Login failed'))
    }
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      setError('')
      const data = await userApi.register(name, email, password)
      setUser(data.user)
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Registration failed'))
    }
  }

  const handleLogout = async () => {
    await userApi.logout()
    if (clientRef.current) clientRef.current.deactivate()
    setUser(null)
    setRooms([])
    setSelectedRoomId(null)
    setMessages([])
    setMembers([])
  }

  const handleCreateRoom = async () => {
    if (!roomName || !roomDesc) return
    try {
      setError('')
      const data = await roomApi.createRoom(roomName, roomDesc)
      setRoomName('')
      setRoomDesc('')
      await loadRooms()
      setSelectedRoomId(data.room.id)
    } catch {
      setError('Could not create room')
    }
  }

  const handleJoinRoom = async () => {
    if (!user || !selectedRoomId) return
    try {
      setError('')
      await roomMembersApi.joinRoom(user.id, selectedRoomId)
      const data = await roomMembersApi.getRoomMembers(selectedRoomId)
      setMembers(data.members)
    } catch {
      setError('Could not join room')
    }
  }

  const handleSendMessage = () => {
    if (!clientRef.current || !selectedRoomId || !user || !messageText.trim()) return

    clientRef.current.publish({
      destination: `/app/chat.sendMessage/${selectedRoomId}`,
      body: JSON.stringify({
        content: messageText.trim(),
        roomId: selectedRoomId,
        senderId: user.id,
      }),
    })
    setMessageText('')
  }

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || null

  // ---- Render ----

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl p-4">
        <h1 className="text-2xl font-semibold mb-1">Chat Room</h1>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {!user ? (
          <AuthCard onLogin={handleLogin} onRegister={handleRegister} />
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <RoomSidebar
              user={user}
              rooms={rooms}
              selectedRoomId={selectedRoomId}
              roomName={roomName}
              roomDesc={roomDesc}
              setRoomName={setRoomName}
              setRoomDesc={setRoomDesc}
              onSelectRoom={setSelectedRoomId}
              onCreateRoom={handleCreateRoom}
              onLogout={handleLogout}
            />

            <ChatArea
              selectedRoom={selectedRoom}
              messages={messages}
              members={members}
              messageText={messageText}
              setMessageText={setMessageText}
              onSendMessage={handleSendMessage}
              onJoinRoom={handleJoinRoom}
            />
          </div>
        )}
      </div>
    </div>
  )
}
