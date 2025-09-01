import { Router } from "express"
import * as leaderboardController from "../controllers/leaderboard-controller"

const router: Router = Router()

router.get("/api/leaderboard", leaderboardController.getLeaderboard)

export default router
