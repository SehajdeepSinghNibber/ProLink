import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get("/",(req,res)=>{
    res.send("<h1>Server is Live</h1>")
})

export default app;