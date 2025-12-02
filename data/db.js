import Database from 'better-sqlite3'
const db = new Database('./data/database.sqlite')

db.prepare(`
CREATE TABLE IF NOT EXISTS books(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
author TEXT,
year TEXT
)`).run()

export const getBooks = () => db.prepare('SELECT * FROM books').all()
export const getBook = (id) => db.prepare('SELECT * FROM books WHERE id = ?').get(id)
export const saveBooks = (title, author, year) => db.prepare('INSERT INTO books (title, author, year) VALUES (?, ?, ?)').run(title, author, year)
export const updateBooks = (id, title, author, year) => db.prepare('UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?').run(title, author, year, id)

const books = [
    {title: "title1", author: "author1", year: "2001"},
    {title: "title2", author: "author2", year: "2002"},
    {title: "title3", author: "author3", year: "2003"}
]

if (books.length == 0) {
    db.saveBooks(title, author, year)
    db.saveBooks(title, author, year)
    db.saveBooks(title, author, year)
}