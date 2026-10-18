import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDB } from "./src/db/connectDB.js";

const PORT = config.PORT || 8000;

const start= async()=>{
    try {
        await connectDB();console.log("DB is connected");
        console.log(`MongoDB Host: ${mongoose.connection.host}`);
        console.log(`Database Name: ${mongoose.connection.name}`);
        app.listen(PORT,()=>{
            console.log(`Server is listening at PORT: ${PORT}`);
        })
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();