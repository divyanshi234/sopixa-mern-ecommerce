const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db.js')
const router=require('./routes/user.js')
const cookieParser = require('cookie-parser')


const app = express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sopixa-mern-ecommerce.onrender.com",
    ],
    credentials: true,
  })
);
// app.use(express.json()); 

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use('/api',router)
const PORT = 8080 || process.env.PORT 
connectDB().then(()=>{
   app.listen(PORT, () =>{
    console.log("connected db")

    console.log("Server is running")
   })
})
