import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchPage extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  // when the user enters data, the query gets updated, the Book Backend gets
  // the query and the resultset is handed over to searchedBooks
  // if no query text exists, the searchedBooks array is set to an empty array
  updateQuery = (query) => {
    this.setState({ query: query })
    if (query.length>0) {
      BooksAPI.search(query).then((books) => {
        this.setState({ searchedBooks: books })
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    const query = this.state.query;
    const searchedBooks = this.state.searchedBooks;

    return (
      <div>
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
       </div>
       {searchedBooks.length > 0 && (
          <div className="search-books-results">
             <ol className="books-grid">
       			 {
               // items that are looped through need a unique id
               searchedBooks.map((book) => (
       			     <li key={book.id}>
       				     <Book
       				       book={book}
                     // addBookToShelf needs to be passed to child Book component
                     // so it is available there as part of the props
                     addBookToShelf={this.props.addBookToShelf}
                   />
       			     </li>
               ))
             }
		         </ol>
          </div>
       )}
     </div>
    );
  }
}

export default SearchPage
