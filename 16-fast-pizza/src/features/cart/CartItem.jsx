import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'

function CartItem ({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-0 sm:mb-0.5'>
        {quantity}&times; {name}
      </p>
      <div className='flex justify-between items-center sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <Button type='small'>Delete item</Button>
      </div>
    </li>
  )
}

export default CartItem
