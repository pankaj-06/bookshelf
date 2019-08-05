import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BookAPI'

class BookCollectionDashboard extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            var newState = {
                currentlyReading: [],
                wantToRead: [],
                read: []
            }

            books.forEach(book => {
                switch (book.shelf) {
                    case 'currentlyReading':
                        newState.currentlyReading.push(book)
                        break
                    case 'wantToRead':
                        newState.wantToRead.push(book)
                        break
                    case 'read':
                        newState.read.push(book)
                        break
                    default:
                        console.log('Should not have occurred')
                        break
                }
            })

            this.setState(prev => newState)
        })
    }

    handleShelfSelection = (book, newShelf) => {
            const oldShelf = book.shelf

                let newState = {}

                //  remove the book from the previous shelf
                newState[oldShelf] = this.state[oldShelf].filter(osBook => (
                    osBook.id !== book.id
                ))

                book.shelf = newShelf
                this.state[newShelf].push(book)
                newState[newShelf] = this.state[newShelf]
                this.setState(prev => newState)
    }

    render() {
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>Book Shelf</h1>
                </div>
                
                <div className='list-books-content'>
                    <BookShelf title='Currently Reading' books={this.state.currentlyReading} onShelfSelection={this.handleShelfSelection} />
                    <BookShelf title='Want to Read' books={this.state.wantToRead} onShelfSelection={this.handleShelfSelection} />
                    <BookShelf title='Read' books={this.state.read} onShelfSelection={this.handleShelfSelection} />
                </div>

            </div>
        )
    }
}

export default BookCollectionDashboard
