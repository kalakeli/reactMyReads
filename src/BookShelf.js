import React, { Component } from 'react';
import Book from './Book';

// BookShelf handles showing the correct shelf with the selected books in it
// BookShelf has title + id (shelf props) plus the books to show (books props)
// BookShelf is loaded via map as many times as there are shelves and uses map
// itself to load as many books as are listed with the respective shelf
class BookShelf extends Component {

  render() {
    const { books, shelf } = this.props;

    return (
      <div className="bookShelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                // Pass book and shelf down to Book component
                book={book}
                shelf={shelf}
                // list items require a unique key
                key={book.id}
                // Pass addBookToShelf to child Book component
                addBookToShelf={this.props.addBookToShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf
