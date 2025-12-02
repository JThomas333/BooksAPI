import express from 'express'
import * as db from './data/db.js'

const PORT = 3010
const app = express()
app.use(express.json())

app.get("/books", (req, res) =>{
    const books = db.getBooks()
    res.status(200).json(books)
})
app.get("/book/:id", (req, res) =>{
    const book = db.getBook(req.params.id)
    if (!book) {
        return res.status(404).json("Not found!")
    }
    res.status(200).json(book)
})
app.post("/books", (req, res) =>{
    const {title, author, year} = req.body
    if (!title || !author || !year) {
        return res.status(400).json("Missing data!")
    }
    const saved = db.getBook(title, author, year)
    const book = db.saveBooks(saved.lastInsertRowid)
    res.status(201).json(book)
})
app.put("/books/:id", (req, res) =>{
    const id = +req.params.id
    const expecting = db.getBook(id)
    if (!expecting) {
        return res.status(404).json("Not found!")
    }
    const {title, author, year} = req.body
    if (!title || !author || !year) {
        return res.status(400).json("Missing data!")
    } 
    db.updateBooks(id, title, author, year)
    const book = db.getBook(+req.params.id)
    res.status(200).json(book)
})



app.listen(PORT, () =>{
    console.log(PORT)
})