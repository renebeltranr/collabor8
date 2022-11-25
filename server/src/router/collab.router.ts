import { Router } from "express";
import collabController from "../controllers/collab";
import authWare from "../middlewares/auth";

const router: any =Router();

router.post("/newCollab", authWare, collabController.create);
router.get("/getAll", collabController.getAll);
router.get("/getUserCollabs/:id", collabController.getUserCollabs);
router.get("/id/:id", collabController.getCollab);
router.delete("/delete/:cid", authWare, collabController.deleteCollab);

router.put("/id/:id/acceptTrack", collabController.acceptTrack);
router.delete("/id/:id/denyTrack", authWare, collabController.denyTrack);
router.delete("/id/:id/deleteTrack", authWare, collabController.deleteTrack);
router.post("/saveTrack", authWare, collabController.saveTrack);
router.put("/id/:id/saveSettings", collabController.saveSettings);

export default router;