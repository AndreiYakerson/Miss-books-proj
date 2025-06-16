const { useState, useEffect } = React

export function CarFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    /* 
     function handleTxtChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, txt: value}))
     }
 
     function handleMinSpeedChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, minSpeed: +value}))
     }
    */

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter container">
            <h2>Filter Our Cars</h2>

            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed || ''} name="minSpeed" id="minSpeed" type="number" />
            </form>
        </section>
    )
}