import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

export default function Header () {
  return (
    <header className='flex items-center justify-between bg-yellow-400 uppercase px-4 py-4 border-b border-stone-200 sm:px-6'>
      <Link to='/' className='tracking-[1px] md:tracking-[5px] mr-auto font-semibold text-base md:text-lg'>Fast React Pizza Co.</Link>
      <SearchOrder />
      <Username />
    </header>
  )
}
