import app from "./app";
import { Server as WebSocketServer } from "socket.io";
import http from 'http';
import sockets from "./sockets";

import { connectDB } from "./db";

var PORT = 3000;

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT)

console.log(`Server is running on PORT: http://localhost:${PORT}`)

const io = new WebSocketServer(httpServer);
sockets(io);