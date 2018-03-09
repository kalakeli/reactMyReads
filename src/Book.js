import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'


class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  setShelf = (book, e) => {
   console.log("in setShelf on shelf " + book.shelf + " changing to " + e)
   const newShelf = e;
   BooksAPI.update(book, newShelf)
  }

  render() {
    // const { book, updateShelf } = this.props
    const { book } = this.props

  	return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.smallThumbnail+')' }} ></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => this.setShelf(book, event.target.value)}  >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {
            // have to ascertain that book.authors are set before running map
            book.authors && (
            <div className="book-authors">{book.authors.map((author) => author + "\n")}</div>
         )}


        </div>
    )
  }
}

export default Book
