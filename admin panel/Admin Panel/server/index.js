import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectDB from '../server/db/db.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Runnig on port http://localhost:${process.env.PORT}`)
})

