

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"



export function RootCmp() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/books/edit/:bookId" element={<BookEdit />} />
                        <Route path="/books/:bookId" element={<BookDetails />} />



                        <Route path="*" element={<NotFound />} />


                    </Routes>
                </main>
            </section>
        </Router>
    )
} 