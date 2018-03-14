import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchPage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    query: '',
    searchedBooks: []
  }

  // when the user enters data, the query gets updated, the Book Backend gets
  // the query and the resultset is handed over to searchedBooks
  // if no query text exists, the searchedBooks array is set to an empty array
  updateQuery = (query) => {
    var i, j
    this.setState({ query: query })
    if (query.length>0) {
      BooksAPI.search(query).then((books) => {
        // some book might already be on a shelf, i.e. it has to get the shelf
        // can't figure out how to do it using map so doing it the old way using
        // an outer and an inner loop comparing the book ids. If a book is in
        // both lists, the shelf props is added
        for (i=0; i<books.length; i++) {
          for (j=0; j<this.props.books.length; j++) {
            if (this.props.books[j].id === books[i].id) {
              books[i].shelf = this.props.books[j].shelf
            }
          }
        }
        this.setState({ searchedBooks: books })

      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    const query = this.state.query;
    const searchedBooks = this.state.searchedBooks;
    const shelf = this.props;

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
                     shelf={shelf}
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
