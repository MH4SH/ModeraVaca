const express = require("express");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");

const port = process.env.port || 4004;

const getTypeDefs = require('./types');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

//Enums 
const UsersType = require('./TypesEnums/UsersType');

const startServer = () => {
    try {
        var app = express();

        const resolvers = {
            UsersType: UsersType,
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