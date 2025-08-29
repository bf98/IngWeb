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
router.put("/api/game/add_friend/:friend_id", gameController.setUser_AddFriend);
router.put("/api/game/remove_friend/:friend_id", gameController.setUser_RemoveFriend);
router.get("/api/game/get_score", gameController.getUser_ScoreNum);
router.put("/api/game/set_score", gameController.setUser_ScoreNum);

export default router
