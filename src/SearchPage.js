import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchPage extends Component {
   static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
  	query: '',
    searchedBooks: []
  }

  // when the user enters data, the query gets updated
  // on this query, a maximum of 20 results is retrieved
  // and handed over to searchedBooks
  updateQuery = (query) => {
    this.setState({ query: query })
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ searchedBooks: books })
    })
  }


 render() {
    const { searchedBooks } = this.props
    const { query } = this.state
console.log(this.state.searchedBooks)
 	return (
       <div className="search-books">
         <div className="search-books-bar">
      	   <Link className='close-search' to='/'>Close</Link>
           <div className="search-books-input-wrapper">
              <input type="text"
      				 placeholder="Search by title or author"
      				 value={query}
      				 onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
         </div>

         <div className="search-books-results">
            <ol className="books-grid">
      			{
                  this.state.searchedBooks.map((book) => (
      			  <li key={book.id}>
      				<Book
      				  book={book}
                    />
      			  </li>
                 ))
}
			</ol>
         </div>
       </div>
    )
 }
}

export default SearchPage
