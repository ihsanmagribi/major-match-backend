const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/database.js')
// const Users = require('./models/users.js')
const Questions = require('./models/questions.js')

require('dotenv').config()

const dbConnect = async () => {
	try {
		await db.authenticate()
		console.log('Database connected..')
		// await Users.sync()
		await Questions.sync()
	} catch (error) {
		console.log(error)
	}
}
dbConnect()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:3000' }))
app.use(express.json())
app.use('/api', require('./routes/index'))

app.listen(PORT, () => {
	console.log(`Server has running on port: ${PORT}`)
})
