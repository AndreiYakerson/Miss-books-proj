

export function DynamicRateCmp(props) {

    const dynamicCmps = {
        rateBySelect: <RateBySelect {...props} />,
        rateByStars: <RateByStars {...props} />,
        rateByTextBox: <RateByTextBox {...props} />
    }

    return dynamicCmps[props.cmpType]
}

export function RateBySelect({ callBack, book }) {

    function changeRateValue(ev,callBack) {
        const value = +ev.target.value
        callBack(value)
        console.log(value);
    }

    return (

        <select name="rate-by-select" onChange={(ev) => changeRateValue(ev,callBack)}>
            <option value={book.rateBy.rateBySelect}>{book.rateBy.rateBySelect}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

    )
}

export function RateByStars() {

    return (

        <div>Stars</div>

    )
}

export function RateByTextBox() {

    return (

        <div>Text Box</div>

    )
}