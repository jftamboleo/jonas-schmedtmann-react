import { useSelector } from 'react-redux'

export default function Username () {
  const username = useSelector(state => state.user.username)

  if (!username) {
    return null
  }

  return (
    <p className='hidden sm:block font-semibold text-sm ml-10'>{username}</p>
  )
}
