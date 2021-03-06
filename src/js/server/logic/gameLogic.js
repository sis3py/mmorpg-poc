const easystarjs = require('easystarjs');
const { gameStatus } = require('../../enum/gameStatus');
const { playerStatus } = require('../../enum/playerStatus');
const { guid } = require('../../helper/guid');
const { games, players } = require('../database/data');
const { initMap, getGrid } = require('../logic/mapLogic');
const { initEnemy } = require('../logic/enemyLogic');

// Create a game
const createGame = (gameName, creatorId) => {
  // Generate an id for this game
  const gameId = guid();

  // Add the current room as game
  games[gameId] = {
    id: gameId,
    name: gameName,
    players: [creatorId],
    nbPlayers: 1,
    status: gameStatus.created,
    enemy: { coordinates: { x: 300, y: 500 } },
  };

  return gameId;
};

// Add a player to an existing game
const addPlayerToGame = (gameId, playerId) => {
  // Increase the number of players
  games[gameId].nbPlayers += 1;

  // Add the current player id to the game players id array
  games[gameId].players = [...games[gameId].players, playerId];
};

const removePlayerFromGame = (gameId, playerId) => {
  // Decrease the number of players
  games[gameId].nbPlayers -= 1;

  // Remove the current player to the game player array
  games[gameId].players = games[gameId].players.filter(id => id !== playerId);

  // If no more players, the game has to be deleted
  if (games[gameId].nbPlayers === 0) {
    delete games[gameId];
  }
};

const updateGameStatus = (gameId, status) => {
  games[gameId] = {
    ...games[gameId],
    status,
  };
};

const isGameReadyToStart = gameId => games[gameId].players.every(id => players[id].status === playerStatus.inLobbyReady);

const getAvailableGames = () => games;

const getGame = gameId => ({
  ...games[gameId],
  players: games[gameId].players.map(id => players[id]),
});

const initGame = (io, gameId) => {
  // Init the map
  const map = initMap();

  // Get a 2D grid from the map
  const grid = getGrid(map);

  // Initialize the pathfinding library
  const easystar = new easystarjs.js();

  // Feed the grid
  easystar.setGrid(grid);

  // Limit the path to the walkable tiles only
  easystar.setAcceptableTiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

  // Initialize the enemy
  initEnemy(getGame(gameId), io, easystar);
};

module.exports = {
  createGame,
  addPlayerToGame,
  removePlayerFromGame,
  getAvailableGames,
  getGame,
  updateGameStatus,
  isGameReadyToStart,
  initGame,
};
