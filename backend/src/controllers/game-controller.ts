import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser, User } from "../utils/auth"

//export async function getUser_ClickNum (_req: Request, res: Response) {
//export const login = async (req: Request, res: Response) => {
export const getUser_ClickNum = async (_req: Request, res: Response) => {

	const user = getUser(_req, res);
	// TODO
	if (user) {
	  const [clickNum] = await connection.execute("SELECT click_num from users where id=?", [user.id]);
	  res.json(clickNum);
	}
	else {
	  res.json({ message: "You need to be logged" });
	}
}

export const setUser_ClickNum = async (_req: Request, res: Response) => {

	// TODO
	const user = getUser(_req, res);

	if (user) {
	  const { clickNum } = _req.body;

	  /*
	  const connection = await pool.getConnection();
	  await connection.beginTransaction();
	  */

	  const [result] = await connection.execute("update users set click_num=? where id=?", [ clickNum, user.id ]);
	}
}

// DA FINIRE
export const setUser_ItemsNum = async (_req: Request, res: Response) => {

	const user = getUser(_req, res);

	if (user) {
	  const { item1, item2, item3 } = _req.body;

	  /*
	  const connection = await pool.getConnection();
	  await connection.beginTransaction();
	  */

	  const [result] = await connection.execute("update items set item1=?, item2=?, item3=? where user_id=?", [ item1, item2, item3, user.id ]);
	}
}

export const setUser_AddFriend = async (req: Request, res: Response) => {

	// TODO
	const user = getUser(req, res);
	const { friend_id } = req.params;

	if (user) {

	  const [result] = await connection.execute("insert into friends (user_id, friend_id) values (?, ?)", [ user.id, friend_id ]);
	}
}

export const getUser_ScoreNum = async (_req: Request, res: Response) => {

	const user = getUser(_req, res);
	// TODO
	if (user) {
	  const [score] = await connection.execute("SELECT score from users where id=?", [user.id]);
	  res.json(score);
	}
	else {
	  res.json({ message: "You need to be logged" });
	}
}

export const setUser_ScoreNum = async (_req: Request, res: Response) => {

	// TODO
	const user = getUser(_req, res);

	if (user) {
	  const { score } = _req.body;

	  /*
	  const connection = await pool.getConnection();
	  await connection.beginTransaction();
	  */

	  const [result] = await connection.execute("update users set score=? where id=?", [ score, user.id ]);
	}
}
