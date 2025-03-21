/*
There are two common ways to synchronize the state of the client upon reconnection:

1. either the server sends the whole state.
2. or the client keeps track of the last event it has processed and the server sends the missing pieces.

Both are totally valid solutions and choosing one will depend on your use case. In this tutorial, we will go with the latter.
*/

import express from "express"
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

// open the database file
const db = await open({
    filename: "chat.db",
    driver: sqlite3.Database,
})

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`)

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
})

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})
io.on("connection", async (socket) => {
    console.log("Connected user!")
    socket.on("chat message", async (msg) => {
        let result
        try {
            result = await db.run(
                "INSERT INTO messages (content) VALUES (?)",
                msg
            )
        } catch (e) {
            // TODO handle the failure
            return
        }
        io.emit("chat message", msg, result.lastID)
    })

    if (!socket.recovered) {
        // if the connection state recovery was not successful
        try {
            // Retrieve all messages where the id is bigger than the one the user last processed
            // since we are using an incremental PK, we know that the ids with bigger values are just the messages
            // that came after the last message they proceed; the missing pieces.

            // Then we just send the user these missing messages to get them up to date.
            await db.each(
                "SELECT id, content FROM messages WHERE id > ?",
                [socket.handshake.auth.serverOffset || 0],
                (_err, row) => {
                    socket.emit("chat message", row.content, row.id)
                }
            )
        } catch (e) {
            // something went wrong
        }
    }
})

server.listen(3000, () => {
    console.log("Server 2 running at http://localhost:3000")
})
