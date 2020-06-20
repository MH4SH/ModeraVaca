const express = require("express");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
require('dotenv').config();

const port = process.env.PORT || 4004;

const getTypeDefs = require('./types');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

//Enuns and Types of elements 
const Types = require('./resolvers/Types');

const startServer = () => {
    try {
        var app = express();
        
        require('./auth')(app);

        const resolvers = {
            ...Types,
            Query,
            Mutation
        };
        const typeDefs = getTypeDefs();
    
        const schema = makeExecutableSchema({ typeDefs, resolvers });
    
        app.use(
            "/graphql",
            graphqlHTTP({
            schema: schema,
            graphiql: true,
            })
        );

        app.listen(port);
        console.log(`Server is running on: http://localhost:${port}/graphql`)

    } catch (e) {
        console.log(e.message);
      throw new Error(e.message);
    }
};

startServer();