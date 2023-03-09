import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Books.css'

export default function Books() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])

  async function getBooks() {
    try {
      let response = await axios.get(
        'https://sahabatpeduliyatim.com/public/api/books'
      )
      setBooks(response.data.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  async function handleDelete(book) {
    setBooks(books.filter((b) => b.id !== book.id))
    await axios.delete(`${'https://sahabatpeduliyatim.com/public/api/delete'}/${book.id}`)
  }

  return (
    <div className='posts'>
      <div className='container'>
        <button
          onClick={() => navigate(`/book/new`)}
          className='btn btn-primary mb-4'
        >
          New Book
        </button>

        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>

                <td>
                  <button
                    onClick={() => navigate(`/book/${book.id}`)}
                    className='btn btn-primary'
                  >
                    Update
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(book)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
