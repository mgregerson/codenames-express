const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { PORT } = require("./config");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
  },
});

const players = {}; // Store connected players
const redTeam = [];
const blueTeam = [];

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket);

  // Handle player joining
  socket.on("join", (playerName) => {
    players[socket.id] = playerName;
    console.log(`${playerName} joined the game`);

    // Notify all players about the new player
    io.emit("playerJoined", playerName);
  });

  socket.on("joinTeam", (team, role, name) => {
    if (team === "red") {
      redTeam.push({ team, role, name, id: socket.id });
      console.log(redTeam);
    } else {
      blueTeam.push({ team, role, name, id: socket.id });
      console.log(blueTeam);
    }
    io.emit("teamUpdate", redTeam, blueTeam);
  });

  // Handle player making a guess
  socket.on("makeGuess", (guess) => {
    // Validate the guess and update game state

    // Notify all players about the guess
    io.emit("guessMade", guess);
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    const playerName = players[socket.id];
    delete players[socket.id];
    console.log(`${playerName} left the game`);

    // Notify all players about the player leaving
    io.emit("playerLeft", playerName);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});

module.exports = io;
