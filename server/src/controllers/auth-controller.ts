import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { getUser, setUser, unsetUser, User } from "../utils/auth"
import { connection } from "../utils/db"

export const register = async (req: Request, res: Response) => {
	const user = getUser(req, res);

	if (user) {
		res.status(401).send("This operation requires log-out")
		return
	}

	const { username, password } = req.body
	
	const [users] = await connection.execute("SELECT name FROM users where name=?", [username, ])
	
	// console.log(Array.isArray(users))
	// console.log(users.length)
	if (Array.isArray(users) && users.length > 0) {
		res.status(400).send("Username not available")
		return 
	}

	const passwordHash = await bcrypt.hash(password, 10)
	
	console.log("inserting user now...")
	await connection.execute("insert into users (name, password) values (?, ?)",
							[ username, passwordHash, ])
	console.log("user should be added to db at this point!")

	const [results] = await connection.execute(
	  "SELECT id, name FROM users WHERE name=?",
	  [username])
	const newUser = (results as User[])[0]

	setUser(req, res, newUser)
	res.json({ message: "Registration succesfully completed" })
}

export const login = async (req: Request, res: Response) => {

	const user = getUser(req, res)
	if (user) {
		res.status(401).send("Questa operazione richiede il logout")
		return
	}

	const { username, password } = req.body
	const [results] = await connection.execute(
					"SELECT id, name, password from users where name=?",
					[username, ]
					)
	
//	if (!Array.isArray(results) || results.length == 0) {
//		res.status(400).send("Credenziali errate")
//		return
//	}

	const userData = (results as User[])[0]
	const correctPassword = await bcrypt.compare(password, userData.password)

	if (!correctPassword) {
		res.status(400).send("Credenziali errate")
		return
	}

	delete userData.password

	setUser(req, res, userData)

	res.json({ message: "Login effettuato con successo" })
}

export const logout = async (req: Request, res: Response) => {
	const user = getUser(req, res)
	
	if (!user) {
		res.status(401).send("Questa operazione richiede l'autenticazione")
		return
	}

	unsetUser(req, res)
	console.log("Logout effettuato")

	res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
	const user = getUser(req, res)
	res.json(user)
}
