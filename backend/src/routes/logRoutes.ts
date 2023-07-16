import express from "express";
import { logController } from "../controllers/logController";
import { Auth } from "../middleware/Auth";

const router = express.Router();

router.post("/", logController.createLog);
router.get("/", Auth, logController.getAllLogs);
router.get("/dashboard/all", Auth, logController.getStatusCounts);
router
  .get("/:id", Auth, logController.getLog)
  .delete("/:id", Auth, logController.deleteLogById)
  .put("/:id", Auth, logController.editLog);

export { router as logRouter };
