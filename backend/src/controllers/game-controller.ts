import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function getUser_ClickNum (_req: Request, res: Response) {

	// TODO
	const [clickNum] = await connection.execute("SELECT * from users ");
	res.json(clickNum);
}

