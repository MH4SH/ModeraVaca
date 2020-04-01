require('custom-env').env('test.key');

const database = require('./database')
database.connection();

const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
    console.log(`API start on port :${process.env.PORT || 3000}`)
});