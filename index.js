import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import forgotResetRoutes from "./routes/forgot-resetRoutes.js";
import verifyEmailRoute from "./routes/verifyEmailRoute.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5200
const app = express()

//connect to database

connectDB();

app.use(cors("*"))
app.use(express.json())
app.use('/api/contacts', contactRoutes)
app.use('/api', userRoutes)
app.use('/api', forgotResetRoutes)
app.use('/api', verifyEmailRoute)


app.get("/", (req, res) => {
    res.json({ message: "welcome" })
})

//listen port 
app.listen(port, () => {
    console.log("Server is runing on port 4000")
})