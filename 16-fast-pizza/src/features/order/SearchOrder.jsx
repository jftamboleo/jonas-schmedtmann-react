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
      <input id='query' name='query' placeholder='Search order #' />
      <button className='ml-2 border border-stone-800 rounded-lg text-sm p-[0.15rem] px-2'>
        <SearchIcon />
      </button>
    </form>
  )
}
