import { useEffect, useRef, useState, type FormEvent } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import * as messageApi from "../api/messageApi";
import * as roomMembersApi from "../api/roomMembersApi";
import * as roomApi from "../api/roomApi";
import { connectToRoom } from "../chat/socket";
import { getErrorMessage } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import type { Client } from "@stomp/stompjs";
import type { Message, RoomMember, Room } from "../types/chat";

const ChatRoom = () => {
  const { id } = useParams();
  const roomId = Number(id);
  const { user, isAuthorized } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [messageText, setMessageText] = useState("");

  // WebSocket client reference
  const clientRef = useRef<Client | null>(null);
  // Auto-scroll to bottom of messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load room info, messages, members, and connect WebSocket
  useEffect(() => {
    if (!isAuthorized || !roomId) return;

    // Load room details by ID
    roomApi
      .getRoomById(roomId)
      .then((data) => setRoom(data.room))
      .catch(() => toast.error("Could not load room info"));

    // Load message history
    messageApi
      .getHistory(roomId)
      .then((data) => setMessages(data.messages))
      .catch(() => toast.error("Could not load messages"));

    // Load room members
    roomMembersApi
      .getRoomMembers(roomId)
      .then((data) => setMembers(data.members))
      .catch(() => toast.error("Could not load members"));

    // Connect WebSocket for live messages
    connectToRoom(roomId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    })
      .then((client) => {
        clientRef.current = client;
      })
      .catch(() => toast.error("WebSocket connection failed"));

    // Cleanup: disconnect WebSocket when leaving the page
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [roomId, isAuthorized]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!clientRef.current || !user || !messageText.trim()) return;

    clientRef.current.publish({
      destination: `/app/chat.sendMessage/${roomId}`,
      body: JSON.stringify({
        content: messageText.trim(),
        roomId,
        senderId: user.id,
      }),
    });
    setMessageText("");
  };

  const handleJoinRoom = async () => {
    if (!user) return;
    try {
      await roomMembersApi.joinRoom(user.id, roomId);
      toast.success("Joined room!");
      const data = await roomMembersApi.getRoomMembers(roomId);
      setMembers(data.members);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not join room"));
    }
  };

  if (!isAuthorized) return <Navigate to="/login" />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Room Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {room?.name || "Chat Room"}
          </h1>
          <p className="text-sm text-gray-500">
            {room?.description || "Loading..."}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleJoinRoom}
            className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
          >
            Join Room
          </button>
          <Link
            to="/rooms"
            className="bg-gray-100 text-gray-900 px-4 py-2 rounded text-sm hover:bg-gray-200"
          >
            ← Back to Rooms
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Messages Section */}
        <div className="md:col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium mb-3 text-gray-600">Messages</h2>
          <div className="h-96 overflow-y-auto space-y-2 border rounded p-3">
            {messages.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-4">
                No messages yet. Start the conversation!
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="rounded bg-gray-50 p-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="font-medium text-gray-700">
                    {msg.senderName}
                  </span>
                  <span>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-sm">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Send Message Form */}
          <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
            >
              Send
            </button>
          </form>
        </div>

        {/* Members Sidebar */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium mb-3 text-gray-600">
            Members ({members.length})
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {members.length === 0 && (
              <p className="text-sm text-gray-400">No members yet</p>
            )}
            {members.map((m) => (
              <div
                key={`${m.userId}-${m.roomId}`}
                className="rounded bg-gray-50 p-2 text-sm"
              >
                <p className="font-medium">User #{m.userId}</p>
                <p className="text-xs text-gray-500">
                  {m.role} / {m.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
