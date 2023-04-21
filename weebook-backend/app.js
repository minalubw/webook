import express, {json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as url from 'url';
import { createWriteStream } from 'fs';
import { join } from 'path';
import usersRouter from './routers/usersRouter.js';
import roomsRouter from './routers/roomsRouter.js'
import { checkAuth } from './middlewares/authChecker.js';


const app = express();
dotenv.config();


(async ()=>{
    try {
        await mongoose.connect(process.env.WEEBOOKDB_URL);
        console.log('Connected to WeeBookDB');
    } catch (error) {
        console.log('Cannot connect to DB!');
    }
})();
const accessLogStream = createWriteStream(join(url.fileURLToPath(new URL('.', import.meta.url)), 'access.log'), { flags: 'a' })
app.disable('x-powered-by');


app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(json());

app.use('/users', usersRouter);
app.use('/rooms', checkAuth, roomsRouter);


app.all('*', (req, res, next) => {
    next(new Error("Route not found!"));
});


app.use((error, req, res, next) => {
    res.status(500).json( { error: error.message });
});


app.listen(process.env.PORT, ()=>{
    console.log("Listening on 3000");
})