import { Router } from "express"
import * as usersController from "../controllers/users-controller"

const router: Router = Router()

router.get("/api/users", usersController.allUsers)
router.get("/api/current_user", usersController.currentUser_getData)
router.get("/api/get_items", usersController.currentUser_getItems)
router.get("/api/get_friends", usersController.currentUser_getFriends)
router.get("/api/users/:id", usersController.getUserById);
router.get("/api/friends/:id", usersController.getFriendsById);
router.get("/api/items/:id", usersController.getItemsById);
router.post("/api/delete_items/:id", usersController.deleteItemsById);
router.post("/api/delete_user/:id", usersController.deleteUserById);
router.post("/api/delete_friends/:id", usersController.deleteFriendListById);

export default router
