import express, { Express } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import history from "connect-history-api-fallback"

import usersRouter from "./routes/users-router"
import leaderboardRouter from "./routes/leaderboard-router"
import authRouter from "./routes/auth-router"

const app: Express = express()
const port: number = 3000

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(usersRouter)
app.use(leaderboardRouter)
app.use(authRouter)

app.use(history())
app.use(express.static("dist-frontend"))

app.use((_, res) => {
	res.setHeader("Content-Type", "text/plain")
	res.status(404).send("404 - Page Not Found")
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
