const io = require("socket.io");
function chatSockets(socketServer: any) {
  let chatio = io(socketServer);
  chatio.sockets.on("connection", function (socket: any) {
    console.log("new connection received", socket.id);
  });
}

export default chatSockets;
