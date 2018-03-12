import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'


// smallest component within the app showing a single book entity; this is used
// in the SearchPage as well as in the BookShelf page
// a book can be shifted between shelves by changing the select value
class Book extends Component {

  constructor(props) {
    super(props);

    // register a change handler for the select menu
    this.handleChange = this.handleChange.bind(this);
  }

  // the selected shelf is passed to update the state when the select menu changes
  handleChange(event) {
    console.log("moving book from shelf " + this.props.book.shelf + " to shelf " + event.target.value)

    // update UI with book's new shelf
    this.props.addBookToShelf(this.props.book, event.target.value);

    // update back-end data with new shelf
    // -> just with this, changes in the shelves are not reflected in the UI
    // this is achieved by passing the function down starting from the App via
    // ListBooks, until it can be called here via the onChange event
    BooksAPI.update(this.props.book, event.target.value);
  }

  render() {
    const { book } = this.props

  	return (
        <div className="book">
          <div className="book-top">
          {
            // make sure book.imageLinks are set before showing a cover
            book.imageLinks && (
              <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: 'url('+book.imageLinks.smallThumbnail+')' }} ></div>
            )
          }

            <div className="book-shelf-changer">
              {
                // books on the shelf have a certain shelf they belong to; books
                // found in the search are set to the shelf 'none'
              }
              <select value={this.props.book.shelf ? this.props.book.shelf : 'none'} onChange={this.handleChange}  >
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {
            // make sure that book.authors are set before running map
            book.authors && (
            <div className="book-authors">{book.authors.map((author) => author + "\n")}</div>
         )}


        </div>
    )
  }
}

export default Book
