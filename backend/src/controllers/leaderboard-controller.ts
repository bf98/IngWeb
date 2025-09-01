import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function getLeaderboard(_req: Request, res: Response) {

	const [leaderboard] = await connection.execute("SELECT * from users order by click_num desc");
	res.json(leaderboard);
}

