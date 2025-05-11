import { Router } from "express"
import * as usersController from "../controllers/users-controller"

const router: Router = Router()

router.get("/api/users", usersController.allUsers)
router.get("/api/current_user", usersController.currentUser)
router.get("/api/get_achievements", usersController.get_achievements)

export default router
