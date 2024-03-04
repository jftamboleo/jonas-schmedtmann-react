import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'

function CartOverview () {
  const totalOrderQuantity = useSelector(state => {
    return state.cart.cart.reduce((prev, curr) => {
      return curr.quantity + prev
    }, 0)
  })

  const totalOrderPrice = useSelector(state => {
    return state.cart.cart.reduce((prev, curr) => {
      return curr.totalPrice + prev
    }, 0)
  })
  const formattedOrderPrice = formatCurrency(totalOrderPrice)

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
