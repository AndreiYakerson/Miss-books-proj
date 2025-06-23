import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    
    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)} >
                            Remove
                        </button>
                        <Link to={`/books/${book.id}`}><button>Details</button></Link>
                    </section>
                </li>
            )}

        </ul>
    )

}