# MyReads Project

MyReads is a small REACT WebApp. It introduces a number of features often needed in REACT.
The app offers two pages. One page shows three shelves on which your read, wannabe-read and currently read books are shown. The other a search page which allows you to scan for more interesting books. __*Important to note*__ is that the backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

Each book, be in the shelves page or the search page, respectively, has a drop down menu attached to it. Clicking on it you can choose how to deal with that specific book. You can move it to a different shelf, remove it completely or add it new.


## Installation

To get started:

* clone / download the project to a folder of your choice
* install all project dependencies with `npm install`
* start the development server with `npm start`

Running `npm start` starts a local server and opens a webpage with the project
in your favourite browser.



## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Structure / Logic of the App

The magic lies within the `src`-Folder.


### src/App.js

The main component. It defines arrays for the books and the shelves, a method to gather the books for the shelves and a method to reflect changes in the shelf also in the UI (`addBookToShelf`). The important thing to note here is that this function needs to be passed down to each child component. It is here that the main state is maintained and played with, so the function needs to be placed here as well. But it is in the second child `Book` component that the item is moved between shelves. Hence, the function is handed over to the next following child components, e.g. the Bookshelf.
```javascript
{
  this.state.shelves.map((shelf) => (
    <BookShelf
      shelf={shelf}
      key={shelf.id}
      books={this.state.books.filter(book => book.shelf === shelf.id)}
      addBookToShelf={this.addBookToShelf}
    />
  ))
}
```
Also note that, because we are using `map` to iterate through the array of shelves, we need a unique identifier (`shelf.id`).

Apart from this, in this overarching component, it is decided according to the URL which page will be called and rendered, the SearchPage (`/search`) or the BookShelf (`/`).


### src/SearchPage.js

SearchPage is a child component to the App and a parent component to Book. It has its own state, i.e. the query that a user can enter to call for more books. If the query is not empty, a backend call is issued to retrieve the books. If books are available, they are saved in an extra array `searchedBooks`. The array will be emptied if not query is entered or no books are available.
If books were saved, they are iterated over using `map`, so we need unique identifiers for the list elements plus the function call to `addBookToShelf` so within the Book component we can add a book to one of our shelves.

### src/Bookshelf.js

The BookShelf is a child component to the App (called as many times as there are shelves) and a parent component to the Book. The only noteworthy thing it is doing is using `map` to iterate over the books on the shelf.
Again, because we are creating list elements, we need unique identifiers, which in this case are the `book.id`s. Also, the child component (`Book`) gets the function to apply UI changes (`addBookToShelf`).

### src/Book.js

The Book is the secondary child component. It is called from each shelf as many times as there are books with the appropriate `shelf`. It is here that the book can be moved to another shelf. Changing the shelf fires an event. The event is handled by a function called `handleChange`. It is here that

* the backend API is updated with the new Book information
* `this.props.addBookToShelf(this.props.book, event.target.value);` is run. The function goes up layer by layer to the App where it applies the new shelf to the new Book.

### src/App.css
Nothing changed but in one place. The class `book-authors` has a new rule how to deal with new lines. In the book component I inserted a new line between the author names for a nicer look.
The new line, though, is ignored in REACT, but what we can do is add something in the css file to convert this 'hidden' new line to a real one. This is achieved by adding `white-space: pre-wrap;`


## Questions, tips, coffee?

If you need further assistance, have tips for improvement or simply want to grab a cup of coffee with me, leave me a line at `karsten.berlin@gmail.com`.
