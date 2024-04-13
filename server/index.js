const jsonServer = require("json-server");
const express = require("express")
const console = require("console");
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((reg, res, next) => {
    setTimeout(next, 508)
})
server.use(router)

const app = express()
app.use(server)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
