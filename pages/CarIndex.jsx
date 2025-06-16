import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"
import { CarDetails } from "./CarDetails.jsx"

const { useState, useEffect, Fragment } = React

export function CarIndex() {
    
    const [cars, setCars] = useState(null)
    const [selectedCarId, setSelectedCarId] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(cars => setCars(cars))
            .catch(err => console.log('err:', err))
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars => cars.filter(car => car.id !== carId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }

    if (!cars) return <div>Loading...</div>
  
    return (
        <section className="car-index">
            {selectedCarId &&
                <CarDetails
                    carId={selectedCarId}
                    onBack={() => setSelectedCarId(null)}
                />
            }
            {!selectedCarId &&
                <Fragment>
                    <CarFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <CarList
                        cars={cars}
                        onRemoveCar={onRemoveCar}
                        onSelectCarId={onSelectCarId}
                    />
                </Fragment>
            }
        </section>
    )


}