import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		};
	}

	handleInput = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSumbit = e => {
		e.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			}
		});
	};

	displayAuthors() {
		let data = this.props.getAuthorsQuery;
		if (data.loading) {
			return <option disabled>Loading authors</option>;
		} else {
			return data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	}
	render() {
		return (
			<form className="add-book" onSubmit={this.handleSumbit}>
				<div className="field">
					<label>Book name:</label>
					<input type="text" name="name" onChange={this.handleInput} />
				</div>
				<div className="field">
					<label>Genre:</label>
					<input type="text" name="genre" onChange={this.handleInput} />
				</div>
				<div className="field">
					<label>Author:</label>
					<select name="authorId" onChange={this.handleInput}>
						<option>Select author</option>
						{this.displayAuthors()}
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
}

// binding query with the component
export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
