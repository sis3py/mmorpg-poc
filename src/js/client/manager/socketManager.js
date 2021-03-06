import io from 'socket.io-client';
import { serverAdress } from '../../configuration/server';

class SocketManager {
  constructor() {
    try {
      this.socket = io.connect(
        serverAdress,
        {
          transports: ['websocket'],
          reconnectionAttempts: 15,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  createGame(gameName) {
    this.socket.emit('createGame', gameName);
  }

  joinGame(gameId) {
    this.socket.emit('joinGame', gameId);
  }

  registerGameIdReceived(callback) {
    this.socket.on('sendGameId', callback);
  }

  unregisterGameIdReceived() {
    this.socket.off('sendGameId');
  }

  leaveGame(gameId) {
    this.socket.emit('leaveGame', gameId);
  }

  getPlayer(playerId) {
    this.socket.emit('getPlayer', playerId);
  }

  getCurrentPlayer() {
    this.socket.emit('getCurrentPlayer');
  }

  registerGetCurrentPlayerReceived(callback) {
    this.socket.on('sendCurrentPlayer', callback);
  }

  unregisterGetCurrentPlayerReceived() {
    this.socket.off('sendCurrentPlayer');
  }

  updateCurrentPlayerSettings(data) {
    this.socket.emit('updateCurrentPlayerSettings', data);
  }

  sendChatMessage(roomId, chatMessage) {
    this.socket.emit('sendChatMessage', { roomId, chatMessage });
  }

  registerChatMessageReceived(callback) {
    this.socket.on('sendChatMessageToGame', callback);
  }

  unregisterChatMessageReceived() {
    this.socket.off('sendChatMessageToGame');
  }

  getAllGames() {
    this.socket.emit('getAllGames');
  }

  registerAllGamesReceived(callback) {
    this.socket.on('sendAllGames', callback);
  }

  unregisterAllGamesReceived() {
    this.socket.off('sendAllGames');
  }

  getGame(gameId) {
    this.socket.emit('getGame', gameId);
  }

  setPlayerReady(gameId) {
    this.socket.emit('setPlayerReady', gameId);
  }

  registerGameReceived(callback) {
    this.socket.on('sendGame', callback);
  }

  unregisterGameReceived() {
    this.socket.off('sendGame');
  }

  sendCurrentPlayerCoordinates(data) {
    this.socket.emit('sendCurrentPlayerCoordinates', data);
  }

  registerPlayerCoordinatesReceived(callback) {
    this.socket.on('sendPlayerCoordinates', callback);
  }

  unregisterPlayerCoordinatesReceived() {
    this.socket.off('sendPlayerCoordinates');
  }

  sendCurrentPlayerStop(data) {
    this.socket.emit('sendCurrentPlayerStop', data);
  }

  registerPlayerStopReceived(callback) {
    this.socket.on('sendPlayerStop', callback);
  }

  unregisterPlayerStopReceived() {
    this.socket.off('sendPlayerStop');
  }

  registerEnemyCoordinatesReceived(callback) {
    this.socket.on('sendEnemyCoordinates', callback);
  }

  unregisterEnemyCoordinatesReceived() {
    this.socket.off('sendEnemyCoordinates');
  }
}

export default SocketManager;
