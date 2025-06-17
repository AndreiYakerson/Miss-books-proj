import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => {
                   return book.listPrice.amount <= filterBy.maxPrice
                    console.log(book.listPrice.amount);
                    

                }) 
            }
            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, carId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyCar(book = '', price = '') {
    return { book, price }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createBooks() { 
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'] 
    const books = [] 
    for (let i = 0; i < 20; i++) { 
        const book = { 
            id: utilService.makeId(), 
            title: utilService.makeLorem(2), 
            subtitle: utilService.makeLorem(4), 
            authors: [ 
                utilService.makeLorem(1) 
            ], 
            publishedDate: utilService.getRandomIntInclusive(1950, 2024), 
            description: utilService.makeLorem(20), 
            pageCount: utilService.getRandomIntInclusive(20, 600), 
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]], 
            thumbnail: `assets/img/${i+1}.jpg`, 
            language: "en", 
            listPrice: { 
                amount: utilService.getRandomIntInclusive(80, 500), 
                currencyCode: "EUR", 
                isOnSale: Math.random() > 0.7 
            } 
        } 
        books.push(book) 
    } 
    console.log('books', books) 
    saveToStorage(BOOK_KEY, books)
}