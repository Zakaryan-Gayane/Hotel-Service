import { Server, Socket } from 'socket.io';
import Message from '../models/message.model';
import { Types } from 'mongoose';
import messageService from '../services/message.service';


class SocketManager {
  initializeSocketIO(io: Server) {
    const staticRoomID = '65b61d7a8db4edc72edb9362';

    io.on('connection', (socket: Socket) => {
      console.log(`user ${socket.currentUser.id} connected`)
  
      // socket.on('chatMessage', async (message: string) => {
      //   socket.join(staticRoomID);
      //   await messageService.addMessageToRoom(message, socket.currentUser.id, staticRoomID)
      //   io.to(staticRoomID).emit('chatMessage', message);
      // });
      // socket.join(roomID);
      socket.on('chatMessage', async (message: string, roomId: string) => {
        await messageService.addMessageToRoom(message, socket.currentUser.id, roomId)
        io.to(roomId).emit('chatMessage', message);
      });

      socket.on('joinRoom', async (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${socket.currentUser.id} joined room ${roomId}`);
      });


      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}

export default new SocketManager()