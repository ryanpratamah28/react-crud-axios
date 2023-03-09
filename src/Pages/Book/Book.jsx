import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Book.css'

export default function Book() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [book, setBook] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    if (!id) return

    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://sahabatpeduliyatim.com/public/api/books/${id}`
        )
        setBook(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchBook()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (id === 'new') {
        axios.post('https://sahabatpeduliyatim.com/public/api/create', book)
        return navigate('/')
      } else {
        axios.put(
          `https://sahabatpeduliyatim.com/public/api/update/${id}`, book
        )
        return navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(e) {
    const bookClone = { ...book }
    bookClone[e.target.name] = e.target.value
    setBook(bookClone)
  }

  return (

    <div className='post__wrapper'>
      <div className='container'>
        <form className='post'>
          <input
            type='text'
            name='title'
            placeholder='Title...'
            value={book.title}
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            placeholder='Description...'
            value={book.description}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className='btn btn-primary'>
            {id === 'new' ? 'Post' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}
