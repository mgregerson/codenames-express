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

const teams = {
  red: {
    players: [],
    score: 0,
  },
  blue: {
    players: [],
    score: 0,
  },
};

let guesses = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle player joining
  socket.on("join", (id) => {
    console.log(`${id} joined the game`);

    // Notify all players about the new player
    io.emit("playerJoined", id);
  });

  socket.on("joinTeam", (team, role, name) => {
    const teamData = teams[team];
    teamData.players.push({ team, role, name, id: socket.id });
    io.emit("teamUpdate", teams);
  });

  // Handle player making a guess. Update the guesses array of objects:
  // { word: "word", team: "red", guesses: 'red' | 'blue' }

  socket.on("makeGuess", (word, currTeam) => {
    let chosenWord;

    console.log("word in socket makeGuess", word);
    console.log("guesses in socket makeGuess", guesses);

    // Update the guesses array - if the word in guesses array matches the word, update that word.
    for (let guess of guesses) {
      if (guess.word === word) {
        chosenWord = guess;
        guess["guess"] = currTeam;
        guess.selected = true;
        break; // Stop iterating after finding the matching word
      }
    }

    console.log(guesses, "GOTCHA GUESSES");

    // Update the score for the current team
    if (chosenWord.team === "blue") {
      teams.blue.score += 1;
      io.emit("updateSelected", chosenWord);
      io.emit("guessMade", guesses, teams);
    } else if (chosenWord.team === "red") {
      teams.red.score += 1;
      io.emit("updateSelected", chosenWord);
      io.emit("guessMade", guesses, teams);
    } else if (chosenWord.team === "death") {
      io.emit("gameOver", currTeam);
    } else if (chosenWord.team === "neutral") {
      io.emit("updateSelected", chosenWord);
      io.emit("guessMade", guesses, teams);
    }
  });

  socket.on("startGame", (cards) => {
    guesses.push(...cards);
    io.emit("gameStarted", guesses);
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Handle player disconnecting
    Object.keys(teams).forEach((team) => {
      const teamData = teams[team];
      teamData.players = teamData.players.filter(
        (player) => player.id !== socket.id
      );
    });

    io.emit("teamUpdate", teams);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});

module.exports = io;
