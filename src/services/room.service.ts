import {IRoom} from "../interfaces/room.interface";
import Room from "../models/room.model";

class RoomService {
    async createRoom(name: string): Promise<void> {
        const newRoom = new Room({
            name
        });
        await newRoom.save();
    }

    async getRooms(): Promise<Array<IRoom>> {
        return Room.find({});
    }

    async deleteRoomByID(roomId: string): Promise<void> {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Message not found');
        }

        await Room.findByIdAndDelete(roomId);
    }
}

export default new RoomService();
