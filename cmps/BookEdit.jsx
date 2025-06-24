
import { bookService } from "../services/book.service.js"
const {useState, useEffect} = React
const { useNavigate } = ReactRouterDOM


export function BookEdit() {

    const [ bookToEdit, setBookToEdit ] = useState(bookService.getEmptyBook()) 
    const navigate = useNavigate()


    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => navigate('/books'))
        .catch(console.log)
        console.log(bookToEdit);
        
    }

    function handleChange({ target }) {
        
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }


    return (
        <section className="book-edit">
            <h1>Add Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Book</label>
                <input onChange={handleChange} value ={bookToEdit.book} type="text" name="title" id="book" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={bookToEdit.price < 1 ? '' : bookToEdit.price} type="number" name="price" id="price" />
                <button>Save</button>
            </form>
        </section>
    )

}