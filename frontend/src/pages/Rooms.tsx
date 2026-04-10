import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import * as roomApi from "../api/roomApi";
import { getErrorMessage } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import type { Room } from "../types/chat";

const Rooms = () => {
  const { isAuthorized } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Create room form state
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  // Load all rooms on mount (only if authorized)
  useEffect(() => {
    if (!isAuthorized) return;
    roomApi
      .getAllRooms()
      .then((data) => setRooms(data.rooms))
      .catch(() => toast.error("Could not load rooms"))
      .finally(() => setLoading(false));
  }, [isAuthorized]);

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await roomApi.createRoom(roomName, roomDesc);
      toast.success("Room created!");
      setRoomName("");
      setRoomDesc("");
      // Refresh rooms list
      const data = await roomApi.getAllRooms();
      setRooms(data.rooms);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not create room"));
    }
  };

  if (!isAuthorized) return <Navigate to="/login" />;

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading rooms...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Chat Rooms</h1>

      {/* Create Room Form */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Create a New Room</h2>
        <form onSubmit={handleCreateRoom} className="space-y-3">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name"
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <input
            value={roomDesc}
            onChange={(e) => setRoomDesc(e.target.value)}
            placeholder="Description"
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 text-sm"
          >
            Create Room
          </button>
        </form>
      </div>

      {/* Rooms List */}
      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms yet. Create one!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{room.description}</p>
              <Link
                to={`/room/${room.id}`}
                className="inline-block mt-4 text-blue-600 hover:underline text-sm"
              >
                Enter Room →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
