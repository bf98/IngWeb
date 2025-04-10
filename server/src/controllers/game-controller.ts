import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function getUser_ClickNum (_req: Request, res: Response) {

	// TODO
	const [clickNum] = await connection.execute("SELECT * from users ");
	res.json(clickNum);
}

export async function setUser_ClickNum (_req: Request, res: Response) {

	// TODO
	const user = getUser(req, res);
	const { clickNum } = req.body;

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	await connection.query('insert into
}
