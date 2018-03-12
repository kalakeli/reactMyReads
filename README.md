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
### src/SearchPage.js
### src/Bookshelf.js
### src/Book.js

### src/App.css
Nothing changed but in one place. The class `book-authors` has a new rule how to deal with new lines. In the book component I inserted a new line between the author names for a nicer look.
The new line, though, is ignored in REACT, but what we can do is add something in the css file to convert this 'hidden' new line to a real one. This is achieved by adding `white-space: pre-wrap;`






## Questions, tips, coffee?

If you need further assistance, have tips for improvement or simply want to grab a cup of coffee with me, leave me a line at `karsten.berlin@gmail.com`.
