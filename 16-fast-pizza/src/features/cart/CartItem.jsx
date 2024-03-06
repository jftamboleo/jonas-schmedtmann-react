import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import UpdateItemQuantity from '../../ui/UpdateItemQuantity'

function CartItem ({ item }) {
  const dispatch = useDispatch()
  const { id, name, quantity, totalPrice } = item

  const handleRemoveFromCart = () => {
    dispatch(deleteItem(id))
  }

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-0 sm:mb-0.5 space-x-2'>
        <span className='font-semibold'>
          {quantity}&times;
        </span>
        <span>
          {name}
        </span>
      </p>
      <div className='flex justify-between items-center sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={id} quantity={quantity} />
        <Button handleClick={handleRemoveFromCart} type='smallDelete'>
          Remove Item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
