const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);



app.use((req, res) => {
    res.status(404).json({error: "Sorry can't find that!"})
  });
app.listen(3333);