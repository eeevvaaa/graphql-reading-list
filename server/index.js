const express = require('express');
// convention for GraphQL where the variable does not match the name of the package.
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// middleware
app.use(
	'/graphql',
	graphqlHTTP({
		// schema: schema
		schema
	})
);

app.listen(4000, () => {
	console.log('\n--- Server running on localhost:4000 ---');
});
