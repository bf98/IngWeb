import { Router } from "express"
import * as leaderboardController from "../controllers/leaderboard-controller"

const router: Router = Router()

router.get("/api/leaderboard_top3", leaderboardController.getLeaderboard_Top3)
router.get("/api/leaderboard_others", leaderboardController.getLeaderboard_Others)

export default router
