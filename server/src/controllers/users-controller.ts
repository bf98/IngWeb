import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser, User } from "../utils/auth"

export async function allUsers(req: Request, res: Response) {

	const [users] = await connection.execute("SELECT * FROM users");
	res.json(users);
}

export async function currentUser_getData(req: Request, res: Response) {

	const user = getUser(req, res);	

	const [result] = await connection.query("select * from users where id=?", [ user.id ]);
	res.json(result);
}

export async function currentUser_getAchievements(req: Request, res: Response) {
	
	const user = getUser(req, res);
	const [result] = await connection.query("select * from achievements where user_id=?", [ user.id ]);

	res.json(result);
}

export async function currentUser_getFriends(req: Request, res: Response) {
	
	const user = getUser(req, res);
	const [result] = await connection.query("select * from friends where user_id=?", [ user.id ]);

	res.json(result);
}

export async function getUserById(req: Request, res: Response) {

	const { id } = req.params;
	const [result] = await connection.query("select * from users where id=?", [id]);

	res.json(result);
}
