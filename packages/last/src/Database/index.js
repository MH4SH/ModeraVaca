const mongoose = require('mongoose');

const config = process.env.IS_TEST === 'test' ? process.env.DATABASE_CONNECTION_TEST : process.env.DATABASE_CONNECTION_STRING;

module.exports = {    
    
    connection: async function (){
        mongoose.connect(config, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true 
        });

        const db = mongoose.connection;
        
        await db.on('connected', () => {
            console.log('Mongoose default connection is open');
        });

        await db.on('error', err => {
            console.log(`Mongoose default connection has occured \n${err}`);
        });

        await db.on('disconnected', () => {
            console.log('Mongoose default connection is disconnected');
        });

        await process.on('SIGINT', () => {
            db.close(() => {
                console.log('Mongoose default connection is disconnected due to application termination');
                process.exit(0);
            });
        });
    }
}