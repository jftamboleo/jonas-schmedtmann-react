import { useDispatch } from 'react-redux'
import Button from './Button'
import { increaseItemQuantity, decreaseItemQuantity } from '../features/cart/cartSlice'

export default function UpdateItemQuantity ({ id, quantity }) {
  const dispatch = useDispatch()

  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(id))
  }
  const handleDecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(id))
  }
  return (
    <div className='flex items-center gap-x-2 md:gap-x-3'>
      <Button type='round' handleClick={handleDecreaseQuantity}>-</Button>
      <h4 className='font-semibold'>{quantity}</h4>
      <Button type='round' handleClick={handleIncreaseQuantity}>+</Button>
    </div>
  )
}
