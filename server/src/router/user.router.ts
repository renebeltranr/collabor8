import { Router } from "express";
import userController from "./../controllers/user";
import authWare from "./../middlewares/auth";

const router: any =Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/me", authWare, userController.me);
router.get("/profile/:username", userController.profile);
router.post("/logout", authWare, userController.logout);
router.put("/profileupdate/:id", authWare, userController.profileUpdate);

export default router;
