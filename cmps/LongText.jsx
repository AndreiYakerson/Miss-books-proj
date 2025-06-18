
const { useState, useEffect, Fragment } = React

export function LongText({txt , maxLength = 50}) {

    const [isLongTxt, setIsLongTxt] = useState(false);

    function onToggleLongTxt() {
        setIsLongTxt(!isLongTxt);
    }
    
    const shortText = txt.length > maxLength ? txt.substring(0, maxLength) + '...' : text;
    return (
        <Fragment>
        <p className="long-text">{isLongTxt ? txt : shortText}</p>
        <button onClick={onToggleLongTxt}>{isLongTxt ? 'Show less' : 'Show more'}</button>
        </Fragment>
    );
}