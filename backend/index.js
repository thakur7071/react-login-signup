import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
let app = express()
let port = process.env.PORT
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use("/api",authRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is running at port ${port}`)
   
})