import { Router } from "express";
import { attachUserId, clerkAuth } from "../middlewares/clerkAuth";
import * as noteController from "../controllers/note.controller";
import { ensureUserExists } from "../middlewares/ensureUserExists.middleware";

const router = Router();

// All note routes requires Authentication
router.use(clerkAuth, attachUserId, ensureUserExists);

router.post("/", noteController.createNote);

export default router;
