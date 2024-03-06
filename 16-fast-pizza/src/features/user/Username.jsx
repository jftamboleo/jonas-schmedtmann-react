import { useSelector } from 'react-redux'
import { getUsername } from './userSlice'

export default function Username () {
  const username = useSelector(getUsername)

  if (!username) {
    return null
  }

  return (
    <p className='hidden sm:block font-semibold text-sm ml-10'>{username}</p>
  )
}
