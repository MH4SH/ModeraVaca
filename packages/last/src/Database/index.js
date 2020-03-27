const mongoose = require('mongoose');


module.exports = {
    
    connection: async function (){
        mongoose.connect('mongodb+srv://marconadmin:AwqDiEEjM1X5RcYw@mh4shbr-dwomq.gcp.mongodb.net/moderavaca?retryWrites=true&w=majority', {
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