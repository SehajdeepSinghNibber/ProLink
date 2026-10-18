import dotenv from 'dotenv';

dotenv.config();

const config = {

    JWT_SECRET : process.env.JWT_SECRET,
    MONGO_URI : process.env.MONGO_URI,
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV

};

export default config;