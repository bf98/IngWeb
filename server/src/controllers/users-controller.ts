import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allUsers(req: Request, res: Response) {

	const [users] = await connection.execute("SELECT * FROM users");
	res.json(users);
}

export async function printTest(_req: Request, res: Response) {
	
	console.log("PRINTING ...");
}
