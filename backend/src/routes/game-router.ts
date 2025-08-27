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
router.put("/api/game/set_clicks", gameController.setUser_ClickNum);
router.get("/api/game/get_clicks", gameController.getUser_ClickNum);
router.put("/api/game/set_items", gameController.setUser_ItemsNum);

export default router
