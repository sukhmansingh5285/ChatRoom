import type { Room, User } from '../../types/chat'

type Props = {
  user: User
  rooms: Room[]
  selectedRoomId: number | null
  roomName: string
  roomDesc: string
  setRoomName: (v: string) => void
  setRoomDesc: (v: string) => void
  onSelectRoom: (id: number) => void
  onCreateRoom: () => void
  onLogout: () => void
}

export const RoomSidebar = ({
  user, rooms, selectedRoomId,
  roomName, roomDesc, setRoomName, setRoomDesc,
  onSelectRoom, onCreateRoom, onLogout,
}: Props) => {
  return (
    <section className="rounded border border-gray-200 bg-white p-4 md:col-span-1">
      {/* User info + logout */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500">Signed in as</p>
          <p className="font-medium text-sm">{user.name}</p>
        </div>
        <button onClick={onLogout} className="rounded bg-gray-100 px-3 py-1 text-sm">
          Logout
        </button>
      </div>

      {/* Create room form */}
      <form
        onSubmit={(e) => { e.preventDefault(); onCreateRoom() }}
        className="mb-4 space-y-2 border-t pt-4"
      >
        <p className="text-sm font-medium">Create Room</p>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <input
          value={roomDesc}
          onChange={(e) => setRoomDesc(e.target.value)}
          placeholder="Description"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <button type="submit" className="w-full rounded bg-gray-900 px-3 py-2 text-sm text-white">
          Create
        </button>
      </form>

      {/* Room list */}
      <p className="text-sm font-medium mb-2">Rooms</p>
      <div className="space-y-1 max-h-60 overflow-y-auto">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full text-left rounded border px-3 py-2 text-sm ${
              selectedRoomId === room.id ? 'border-gray-900 bg-gray-100' : 'border-gray-200'
            }`}
          >
            <p className="font-medium">{room.name}</p>
            <p className="text-xs text-gray-500">{room.description}</p>
          </button>
        ))}
        {rooms.length === 0 && <p className="text-sm text-gray-400">No rooms yet</p>}
      </div>
    </section>
  )
}
