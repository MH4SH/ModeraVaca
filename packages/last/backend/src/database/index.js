const mongoose = require('mongoose');


module.exports = {    
    
    connection: () => {

        const config = process.env.IS_TEST === 'test' ? process.env.DATABASE_CONNECTION_TEST : process.env.DATABASE_CONNECTION_STRING;

        mongoose.connect(config, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true 
        });

        const db = mongoose.connection;
        
        db.on('connected', () => {
            console.log('Mongoose default connection is open');
        });

        db.on('error', err => {
            console.log(`Mongoose default connection has occured \n${err}`);
        });

        db.on('disconnected', () => {
            console.log('Mongoose default connection is disconnected');
        });

        process.on('SIGINT', () => {
            db.close(() => {
                console.log('Mongoose default connection is disconnected due to application termination');
                process.exit(0);
            });
        });
    },
    connectionTest: () => {

        const config = process.env.IS_TEST === 'test' ? process.env.DATABASE_CONNECTION_TEST : process.env.DATABASE_CONNECTION_STRING;

        mongoose.connect(config, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true 
        });

        const db = mongoose.connection;
        
        db.on('connected', () => {});

        db.on('error', err => err);

        db.on('disconnected', () => {});

        process.on('SIGINT', () => {
            db.close(() => {
                process.exit(0);
            });
        });
    },
    close: async () => {
        mongoose.disconnect();
    },
    mongoose: mongoose
}