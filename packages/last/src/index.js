const express = require('express');
const mongoose = require('mongoose');;

const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://marconadmin:AwqDiEEjM1X5RcYw@mh4shbr-dwomq.gcp.mongodb.net/moderavaca?retryWrites=true&w=majority', {
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
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});




const routes = require('./routes')
app.use(routes);


app.use((req, res) => {
    res.status(404).json({error: "Sorry can't find that!"})
  });


app.listen(3333, () => {
  console.log('API start on port :3333')
});
