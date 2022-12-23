const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
require('./database');
const server = http.createServer(app);
// const io = new Server(server, {
//     cors: '*',
//     // cors: 'http://localhost:3006',
//     // methods: '*'
//     methods: ['GET', 'POST', 'PATCH', "DELETE"]
//   })
  // const path = require("path");
  
const userModel = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.get("/", (req, res) =>
  res.send(`Server Running`)
);

const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/images', imageRoutes);

server.listen(PORT, ()=>{
  console.log('listening to', PORT)
  })

  // app.set('socketio', io);