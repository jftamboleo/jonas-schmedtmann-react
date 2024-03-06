import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import { getTotalOrderPrice, getTotalOrderQuantity } from './cartSlice'

function CartOverview () {
  const totalOrderQuantity = useSelector(getTotalOrderQuantity)
  const totalOrderPrice = useSelector(getTotalOrderPrice)
  const formattedOrderPrice = formatCurrency(totalOrderPrice)

  if (!totalOrderQuantity) {
    return null
  }

  return (
    <div className='bg-stone-800 p-4 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between'>
      <p className='text-stone-300 space-x-4 sm:space-x-6 font-semibold'>
        <span>{totalOrderQuantity} pizzas</span>
        <span>{formattedOrderPrice}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
