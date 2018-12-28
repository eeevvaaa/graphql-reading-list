const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// define object type. pay attention to the capitalization
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

//dummy data
// const books = [
// 	{
// 		name: "Harry Potter and the Sorcerer's Stone",
// 		genre: 'Fantasy',
// 		id: '1',
// 		authorId: '1'
// 	},
// 	{
// 		name: 'Harry Potter and the Chamber of Secrets',
// 		genre: 'Fantasy',
// 		id: '2',
// 		authorId: '1'
// 	},
// 	{
// 		name: 'Harry Potter and the Prisoner of Azkaban',
// 		genre: 'Fantasy',
// 		id: '3',
// 		authorId: '1'
// 	}
// ];
// const authors = [{ name: 'J.K. Rowling', age: 53, id: '1' }];

// define a schema, how a graph will look
const BookType = new GraphQLObjectType({
	name: 'Book',
	// function to reference types
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// parent is the book
				return _.find(authors, { id: parent.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			// type:BookType would be a single BookType, GraphQLList would give a list of BookTypes
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, { authorId: parent.id });
			}
		}
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
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID }
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
