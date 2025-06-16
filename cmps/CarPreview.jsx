export function CarPreview({ car }) {



    const { title , thumbnail} = car
    return (
        <article className="car-preview">
            <h2>Title: {title}</h2>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}