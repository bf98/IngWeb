import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser, User } from "../utils/auth"

export async function allUsers(req: Request, res: Response) {

	const [users] = await connection.execute("SELECT * FROM users");
	res.json(users);
}

export async function printTest(_req: Request, res: Response) {
	
	console.log("PRINTING ...");
}

export async function currentUser(req: Request, res: Response) {

	const user = getUser(req, res);	

	const [result] = await connection.query("select * from users where id=?", [ user.id ]);
	res.json(result);
}
