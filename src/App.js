import React from 'react'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'


class BooksApp extends React.Component {
  state = {
	  books: []
  }
  // use componenDidMount to read a list of all books on the shelf
  // the resulting list is handed over to the state
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // to reflect the changes in the shelf also in the UI, the state of the books
  // need to be adjusted
  // - this function takes the book and the new shelf and adjusts the state
  // - the function is handed down to the child component ListBooks and from
  //   there down to the child component Book
  addBookToShelf = (bookToAdd, shelf) => {
     this.setState(state => {
       // filter the books array to reflect the changes
       const updatedState = state.books.filter(book => book.id !== bookToAdd.id);

       return {
         books: [...updatedState, { ...bookToAdd, shelf }]
       };
     });
   };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
    		    <SearchPage/>
        )}/>
        <Route exact path='/' render={() => (
    		    <ListBooks
              books={this.state.books}
            />
        )}/>

      </div>
    )
  }
}

export default BooksApp
