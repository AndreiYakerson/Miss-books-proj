
const {Link, NavLink} = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header container">
            <section>
                <h1>Miss Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/books" >Books</NavLink>
                </nav>
            </section>
        </header>
    )
}