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

    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail, listPrice  } = book

    return (
        <section className="book-details container">
            <h1>Title: {title}</h1>
            <h1>Description: </h1>
            <p>{description}</p>
            <img src={thumbnail} alt="Book Image" />
            <p>Price: <span className={getPriceClass(listPrice.amount)}>{listPrice.amount}</span></p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}