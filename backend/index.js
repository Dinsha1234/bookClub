import express from "express"
import { PORT, MONGO_DB_URL } from "../backend/config.js"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { Book } from "./models/bookModel.js"
import bookRouter from "./routers/bookRouter.js"

const app = express()

app.get('/', (req,res)=> {
    return res.status(234).send('HEY THERE ')
})

app.use('/books', bookRouter)

mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
        console.log('DB CONNECTED')
        app.listen(PORT, () => {
            console.log(`app is listening to PORT ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })



