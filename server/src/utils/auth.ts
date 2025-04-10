import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export interface User {
	id: number,
	username: string, 
	password: string,
	click_num: number,
}

const JWT_SECRET = "foo"
const COOKIE_NAME = "vuepost-access-token"

export const setUser = (_req: Request, res: Response, user: any) => {
	const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
	res.cookie(COOKIE_NAME, accessToken, {
		maxAge: 86400000,
		httpOnly: true,
		sameSite: true,
	})
}

export const getUser = (req: Request, _res: Response) => {
	const accessToken = req.cookies[COOKIE_NAME]
	if (!accessToken) return null

	try {
		const user = jwt.verify(accessToken, JWT_SECRET) as User
		return user
	}
	catch {
		return null
	}
}

export const unsetUser = (_req: Request, res: Response) => {
	res.clearCookie(COOKIE_NAME)
}
