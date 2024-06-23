import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const { DB_URI } = process.env;

const config = { 
    db: {
        uri: DB_URI
    },
};

export default config;