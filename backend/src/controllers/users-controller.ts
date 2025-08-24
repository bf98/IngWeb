import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser, User } from "../utils/auth"

export async function allUsers(req: Request, res: Response) {

	const [users] = await connection.execute("SELECT * FROM users");
	res.json(users);
}

export async function currentUser_getData(req: Request, res: Response) {

	const user = getUser(req, res);	
	
	if (user) {
		const [result] = await connection.query("select * from users where id=?", [ user.id ]);
		res.json(result);
	}
}

export async function currentUser_getAchievements(req: Request, res: Response) {
	
	const user = getUser(req, res);
	
	if (user) {
		const [result] = await connection.query("select * from achievements where user_id=?", [ user.id ]);
		res.json(result);
	}
}

export async function currentUser_getFriends(req: Request, res: Response) {
	
	const user = getUser(req, res);

	if (user) {
		const [friend_ids] = await connection.query("select friend_id from friends where user_id=?", [ user.id ]);
		const friend_array: number[] = friend_ids.map((friend_ids: { friend_id: number }) => friend_ids.friend_id);

		console.log(friend_array);

		if (friend_array.length > 0) {

			const [result] = await connection.query("select * from users where id in (?)", [friend_array]);
			console.log(result);
			res.json(result);
		}
	}
}

export async function getUserById(req: Request, res: Response) {

	const { id } = req.params;
	const [result] = await connection.query("select * from users where id=?", [id]);

	res.json(result);
}
