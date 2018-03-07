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

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
    		<SearchPage
    		  books={this.state.books}
    		/>
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
