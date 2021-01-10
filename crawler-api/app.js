const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT_SERVER_CRAWLER || 3000

const indexRouter = require('./routes/index')
const roomsRouter = require('./routes/rooms')

app.use('/', indexRouter)
app.get('/rooms', roomsRouter)  

app.listen(port, () => {
    console.info(`App listining at http://localhost:${port}`)
})