import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("<h1>Server is Live</h1>")
})

app.use("/api/auth",authRouter);

export default app;