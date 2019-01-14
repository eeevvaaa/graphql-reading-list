const express = require('express');
// convention for GraphQL where the variable does not match the name of the package.
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express();

// allow cross-origin request
app.use(cors());

// connet to mlab database
mongoose.connect('mongodb://user:test123@ds111963.mlab.com:11963/gql-rdg-ls');
mongoose.connection.once('open', () => {
	console.log('\n--- Connected to database ---');
});

// middleware
app.use(
	'/graphql',
	graphqlHTTP({
		// schema: schema is the same as below
		schema,
		graphiql: true
	})
);

app.listen(port, () => {
	console.log(`\n--- Server running on port ${port} ---`);
});
