import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"
import { DynamicRateCmp } from "../cmps/RateBy.jsx"


const { useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const [rateBy, setRateBy] = useState('rateBySelect')
    const [rateValue, setRateValue] = useState(1)

    const { bookId } = useParams()

    useEffect(() => {
        loadBook()
    }, [rateBy, rateValue])


    function loadBook() {
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
        return yearDiff > 20 ? 'Vintage' : 'New'
    }

    function handleRateChange(event) {
        setRateBy(event.target.value);
        // Update state with the selected value
    }

    function changeRateValue(value) {
        setRateValue(value);
    }

    function onSaveRate(ev, book, rateBy, rateValue) {
        ev.preventDefault()

        if (rateBy === 'rateBySelect') book.rateBy[rateBy] = rateValue
        bookService.save(book)
            .then(loadBook)
            .catch(console.log)
            console.log(book);
            
    }



    if (!book) return <div>Loading...</div>

    const { title, description, thumbnail, listPrice, pageCount, publishedDate, price } = book

    return (
        <section className="book-details container">
            {title && <h1>Title: {title}</h1>}
            {description && <h1>Description: </h1>}
            {description && <LongText
                txt={description}
                maxLength={50} />}
            {pageCount && <p>Page count: {pageCount} ({getReading(pageCount)})</p>}
            {thumbnail && <div className="thumbnail">
                <img src={thumbnail} alt="Book Image" />
                {listPrice.isOnSale && <div className="on-sale">On Sale</div>}
            </div>}
            {listPrice && <p>Price: <span className={getPriceClass(price)}>{`${listPrice.amount} ${listPrice.currencyCode}`}</span></p>}
            {<p>Rate: {book.rateBy.rateBySelect || book.rateBy.rateByStars || book.rateBy.rateByTextBox}</p>}
            {publishedDate && <p>Published: {getPublishedDate(publishedDate)}</p>}

            <div className="rate-container">
                <select name="rate-by" onChange={handleRateChange}>
                    <option value="rateBySelect">By Select</option>
                    <option value="rateByStars">By Stars</option>
                    <option value="rateByTextBox">By Text</option>
                </select>

                <form action="submit" onSubmit={(ev) => onSaveRate(ev, book, rateBy, rateValue)}>
                    <DynamicRateCmp cmpType={rateBy} callBack={changeRateValue} book={book} />
                    <button>Save</button>
                </form>

            </div>

            <Link to="/books"><button>Back</button></Link>
        </section>
    )
}