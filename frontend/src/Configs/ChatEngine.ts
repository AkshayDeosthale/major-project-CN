import { socket } from "../socket";

export function ChatEngine(chatBoxId: string, userEmail: string) {
  const chatId = `#${chatBoxId}`;
  if (userEmail) {
    socket.on("connect", function () {
      console.log("connection established with sockets!");
    });
  }
}
