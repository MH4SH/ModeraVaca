const express = require('express');


function teste(req, res){
    res.json({rota: "Sucesoso"});
}



const routes = express.Router();

routes.post('/data', teste);







module.exports = routes;