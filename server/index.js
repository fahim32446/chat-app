import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { Server } from "socket.io";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch(err => console.log("err"))



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);

app.get('/', (req, res) => {
    res.send("App is running")
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
