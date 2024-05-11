import { NextFunction, Request, Response } from "express";
import { respStatus } from "../enums/response.enum";
import { HelperService } from "../services/helper.service";
import roomService from "../services/room.service";

class RoomController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const data = await roomService.createRoom(name);
            res
                .status(201)
                .send(HelperService.formatResponse(respStatus.CREATED, { room: data }));
        } catch (error) {
            return next(error);
        }
    }
}

export default new RoomController();
