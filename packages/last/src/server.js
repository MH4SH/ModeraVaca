require('custom-env').env('key');

const Database = require('./Database')
Database.connection();

const app = require('./app');

app.listen(3333, () => {
    console.log('API start on port :3333')
});