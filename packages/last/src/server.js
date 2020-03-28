require('custom-env').env('rv.key');

const database = require('./database')
database.connection();

const app = require('./app');

app.listen(3333, () => {
    console.log('API start on port :3333')
});