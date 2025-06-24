import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(car => car.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>
  
    return (

        <section className="book-index">
            {!selectedBookId &&
                <Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                        />

                        <Link to="/books/edit"><button>Add</button></Link>

                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
        </section>
    )


}