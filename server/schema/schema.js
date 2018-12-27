const graphql = require('graphql');

// define object type. pay attention to the capitalization
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

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

// root query, the entry point
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			// decide which specific book to land on, book(id: '123')
			args: { id: { type: GraphQLString } },
			//code to get data from db or other source
			resolve(parent, args) {
				args.id;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
