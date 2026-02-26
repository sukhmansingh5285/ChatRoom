import type { Message, Room, RoomMember } from '../../types/chat'

type Props = {
  selectedRoom: Room | null
  messages: Message[]
  members: RoomMember[]
  messageText: string
  setMessageText: (v: string) => void
  onSendMessage: () => void
  onJoinRoom: () => void
}

export const ChatArea = ({
  selectedRoom, messages, members,
  messageText, setMessageText, onSendMessage, onJoinRoom,
}: Props) => {
  return (
    <section className="rounded border border-gray-200 bg-white p-4 md:col-span-2">
      {/* Room header */}
      <div className="mb-3 flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="font-semibold">{selectedRoom?.name ?? 'Select a room'}</h2>
          <p className="text-sm text-gray-500">{selectedRoom?.description ?? 'Choose a room to start chatting'}</p>
        </div>
        <button
          onClick={onJoinRoom}
          disabled={!selectedRoom}
          className="rounded bg-gray-900 px-3 py-2 text-sm text-white"
        >
          Join Room
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {/* Messages + Send */}
        <div className="md:col-span-2">
          <div className="h-72 space-y-2 overflow-y-auto rounded border border-gray-200 p-3">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded bg-gray-50 p-2 text-sm">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{msg.senderName}</span>
                  <span>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <p className="mt-1">{msg.content}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="text-sm text-gray-400">No messages yet</p>}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); onSendMessage() }}
            className="mt-3 flex gap-2"
          >
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message"
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
              disabled={!selectedRoom}
            />
            <button type="submit" disabled={!selectedRoom} className="rounded bg-gray-900 px-4 py-2 text-sm text-white">
              Send
            </button>
          </form>
        </div>

        {/* Members panel */}
        <div>
          <h3 className="mb-2 text-sm font-medium">Members</h3>
          <div className="h-72 space-y-2 overflow-y-auto rounded border border-gray-200 p-3">
            {members.map((m) => (
              <div key={`${m.userId}-${m.roomId}`} className="rounded bg-gray-50 p-2 text-xs">
                <p>User #{m.userId}</p>
                <p className="text-gray-500">{m.role} / {m.status}</p>
              </div>
            ))}
            {members.length === 0 && <p className="text-sm text-gray-400">No members</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
