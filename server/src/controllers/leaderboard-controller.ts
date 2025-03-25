import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function getLeaderboard_Top3(_req: Request, res: Response) {

	const [leaderboard] = await connection.execute("SELECT * from users order by click_num desc limit 3");
	res.json(leaderboard);
}

export async function getLeaderboard_Others(_req: Request, res: Response) {

	const [leaderboard] = await connection.execute("SELECT * from users order by click_num desc limit 3, 10");
	res.json(leaderboard);
}
