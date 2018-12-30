import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

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

	displayAuthors() {
		let data = this.props.data;
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
			<form className="add-book">
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
export default graphql(getAuthorsQuery)(AddBook);
