import express from "express";
import { logController } from "../controllers/logController";
import { Auth } from "../middleware/Auth";

const router = express.Router();

router.post("/", logController.createLog);
router.get("/", Auth, logController.getAllLogs);
router.get("/:id", Auth, logController.getLog);
router.put("/:id", Auth, logController.editLog);

export { router as logRouter };
