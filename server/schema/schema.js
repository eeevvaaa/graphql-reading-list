const graphql = require('graphql');

// define object type. pay attention to the capitalization
const { GraphQLObjectType, GraphQLString } = graphql;

// define a schema, how a graph will look
const BookType = new GraphQLObjectType({
	name: 'Book',
	// function to reference types
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});
