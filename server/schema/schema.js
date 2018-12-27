const graphql = require('graphql');
const _ = require('lodash');

// define object type. pay attention to the capitalization
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql;

//dummy data
const books = [
	{
		name: "Harry Potter and the Sorcerer's Stone",
		genre: 'Fantasy',
		id: '1'
	},
	{
		name: 'Harry Potter and the Chamber of Secrets',
		genre: 'Fantasy',
		id: '2'
	},
	{
		name: 'Harry Potter and the Prisoner of Azkaban',
		genre: 'Fantasy',
		id: '3'
	}
];

const authors = [{ name: 'J.K. Rowling', age: 53, id: '1' }];

// define a schema, how a graph will look
const BookType = new GraphQLObjectType({
	name: 'Book',
	// function to reference types
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
});

// root query, the entry point
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			// decide which specific book to land on, book(id: '123')
			args: { id: { type: GraphQLID } },
			//code to get data from db or other source
			resolve(parent, args) {
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
