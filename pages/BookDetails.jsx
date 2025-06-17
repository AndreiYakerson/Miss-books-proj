import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadCar()
    }, [])

    function loadCar() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getPriceClass(amount) {
        return amount > 200 ? 'red' : 'green'
    }

    function getReading(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail, listPrice, pageCount  } = book

    return (
        <section className="book-details container">
            <h1>Title: {title}</h1>
            <h1>Description: </h1>
            <p>{description}</p>
            <p>Page count: {pageCount} ({getReading(pageCount)})</p>
            <img src={thumbnail} alt="Book Image" />
            <p>Price: <span className={getPriceClass(listPrice.amount)}>{listPrice.amount}</span></p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}