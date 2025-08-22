import { Router } from "express"
import * as usersController from "../controllers/users-controller"

const router: Router = Router()

router.get("/api/users", usersController.allUsers)
router.get("/api/print", usersController.printTest)

export default router
