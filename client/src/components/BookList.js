import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
	displayBooks() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading books...</div>;
		} else {
			return data.books.map(book => {
				return <li key={book.id}>{book.name}</li>;
			});
		}
	}
	render() {
		// console.log(this.props);
		return (
			<div>
				<ul className="book-list">{this.displayBooks()}</ul>
				<BookDetails />
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
