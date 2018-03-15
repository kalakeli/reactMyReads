import React from 'react'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import { Link } from 'react-router-dom';

// overarching component
// - depending on the URL either SearchPage or BookShelf component is shown
// - BookShelf contains another component to show a specific Book
class BooksApp extends React.Component {
  state = {
    // it's all about the books which need to be able to be passed down to
    // child components as props
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
     if (bookToAdd.shelf !== shelf) {
           BooksAPI.update(bookToAdd, shelf).then(() => {
             bookToAdd.shelf = shelf

             // Filter out the book and append it to the end of the list
             // so it appears at the end of whatever shelf it was added to.
             this.setState(state => ({
               books: state.books.filter(b => b.id !== bookToAdd.id).concat([ bookToAdd ])
             }))
           })
     }
   };

  render() {
    const shelves = [
          {
            id: "currentlyReading", name: "Currently Reading"
          },{
            id: "wantToRead", name: "Want to Read"
          },{
            id: "read", name: "Read"
          }
        ]
    return (
      <div className="app">
        <Route path='/search' render={() => (
    		    <SearchPage
              books={this.state.books}
              addBookToShelf={this.addBookToShelf}
            />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
             <div className="list-books-title">
               <h1>MyReads</h1>
             </div>
             <div className="list-books-content">

               {
                 shelves.map((shelf) => (
                   <BookShelf
                     shelf={shelf}
                     key={shelf.id}
                     // the books need to be filtered according to the shelf id,
                     // otherwise all books are shown on all shelves
                     books={this.state.books.filter(book => book.shelf === shelf.id)}
                     // function to reflect the changes in UI is also passed down
                     addBookToShelf={this.addBookToShelf}
                   />
                 ))
               }

             </div>
             <div className="open-search">
                <Link to='/search'>Add a book</Link>
             </div>
         </div>

      )}/>

     </div>
    )
  }
}

export default BooksApp
