import { useNavigate } from 'react-router-dom'
import SearchIcon from '../../ui/SearchIcon'

export default function SearchOrder () {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const query = fields.get('query')
    if (!query) return
    document.getElementById('query').value = ''
    navigate(`/order/${query}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='query'
        name='query'
        placeholder='Search order #'
        className='rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2'
      />
      <button className='ml-2 border border-stone-800 text-sm p-2 rounded-full'>
        <SearchIcon />
      </button>
    </form>
  )
}
