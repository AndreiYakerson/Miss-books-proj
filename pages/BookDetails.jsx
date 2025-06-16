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

    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail  } = book

    return (
        <section className="car-details container">
            <h1>Title: {title}</h1>
            <h1>Description: </h1>
            <p>
            {description}
            </p>
            <img src={thumbnail} alt="Book Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}