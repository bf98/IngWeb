import { Router } from "express"
import * as gameController from "../controllers/game-controller"

const router = Router()

/*
router.post("/api/auth/register", authController.register)
router.post("/api/auth/login", authController.login)
router.post("/api/auth/logout", authController.logout)
router.get("/api/auth/profile", authController.getProfile)
*/

// TODO
router.post("/api/game/update_clicks", gameController.setUser_ClickNum);

export default router
