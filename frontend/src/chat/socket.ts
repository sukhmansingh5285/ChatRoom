import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import type { Message } from '../types/chat'

// Connect to a chat room via WebSocket (STOMP over SockJS)
// Returns a client object so the caller can send messages and disconnect
export const connectToRoom = (
  roomId: number,
  onMessage: (msg: Message) => void,
): Promise<Client> => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8071/ws-chat'),
      reconnectDelay: 0,
      debug: () => {},
    })

    client.onConnect = () => {
      // Subscribe to this room's topic
      client.subscribe(`/topic/room/${roomId}`, (frame) => {
        onMessage(JSON.parse(frame.body) as Message)
      })
      resolve(client)
    }

    client.onStompError = () => reject(new Error('WebSocket connection failed'))
    client.activate()
  })
}
