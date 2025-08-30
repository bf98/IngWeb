import { Router } from "express"
import * as usersController from "../controllers/users-controller"

const router: Router = Router()

router.get("/api/users", usersController.allUsers)
router.get("/api/current_user", usersController.currentUser_getData)
router.get("/api/get_achievements", usersController.currentUser_getAchievements)
router.get("/api/get_items", usersController.currentUser_getItems)
router.get("/api/get_friends", usersController.currentUser_getFriends)
router.get("/api/users/:id", usersController.getUserById);
router.get("/api/achievements/:id", usersController.getAchievementsById);
router.get("/api/friends/:id", usersController.getFriendsById);
router.get("/api/items/:id", usersController.getItemsById);

export default router
