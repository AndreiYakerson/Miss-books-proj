import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'carDB'
_createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createCars() {
    let cars = loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = [
            _createCar('audu', 300),
            _createCar('fiak', 120),
            _createCar('subali', 50),
            _createCar('mitsu', 150)
        ]
        saveToStorage(CAR_KEY, cars)
    }
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
            thumbnail: `../assets/img/${i+1}.jpg`, 
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