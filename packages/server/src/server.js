const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
require('dotenv').config();

const port = process.env.PORT || 4004;

const getTypeDefs = require('./types');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

//Auth for authenticate
const auth = require('./auth');
const middlewaresAuth = require('./auth/middleware');

//Enums and Types of elements 
const Types = require('./resolvers/Types');

const startServer = () => {
	try {
		var app = express();
		app.use(cors());
		auth(app);

		const resolvers = {
			...Types,
			Query,
			Mutation
		};
		const typeDefs = getTypeDefs();
	
		const schema = makeExecutableSchema({ typeDefs, resolvers });
	
		app.use(
			"/graphql",
			middlewaresAuth,
			graphqlHTTP({
			schema: schema
			})
		);
		
		app.listen(port);
		console.log(`Server is running on: \nhttp://localhost:${port}/graphql \nhttp://localhost:${port}/graphiql`)

	} catch (e) {
		console.log(e.message);
	  throw new Error(e.message);
	}
};

startServer();