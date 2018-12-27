const express = require('express');
// convention for GraphQL where the variable does not match the name of the package.
const graphqlHTTP = require('express-graphql');

const app = express();

// middleware
app.use('/graphql', graphqlHTTP({}));

app.listen(4000, () => {
	console.log('\n--- Server running on localhost:4000 ---');
});
