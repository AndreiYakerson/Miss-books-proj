import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"

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

    function getPublishedDate(publishedDate) {
        const yearDiff = new Date().getFullYear() - publishedDate
        console.log(yearDiff);


        return yearDiff > 20 ? 'Vintage' : 'New'
    }

    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail, listPrice, pageCount, publishedDate } = book

    return (
        <section className="book-details container">
            <h1>Title: {title}</h1>
            <h1>Description: </h1>
            <LongText
                txt={description}
                maxLength={50} />
            <p>Page count: {pageCount} ({getReading(pageCount)})</p>
            <div className="thumbnail">
                <img src={thumbnail} alt="Book Image" />
                {listPrice.isOnSale && <div className="on-sale">On Sale</div>}
            </div>
            <p>Price: <span className={getPriceClass(listPrice.amount)}>{listPrice.amount}</span></p>
            <p>Published: {getPublishedDate(publishedDate)}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}