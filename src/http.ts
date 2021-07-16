import "./database";
import app from './app';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import express from 'express';

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

const http = createServer(app);
const io = new Server(http);


io.on("connection",(socket: Socket) => {
    console.log("SE CONECTOU, ", socket.id)
});

export { http, io};