import { Router } from "express";
import messageController from "../../controllers/message.controller";
import roomController from "../../controllers/room.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id/messages", auth, messageController.getMessagesByRoomID);
router.post("/", auth, roomController.create);

export default router;
