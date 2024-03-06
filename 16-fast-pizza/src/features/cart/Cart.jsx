import { useSelector } from 'react-redux'
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { clearCart, getCart } from './cartSlice'
import { getUsername } from '../user/userSlice'
import { useDispatch } from 'react-redux'

function Cart () {
  const dispatch = useDispatch(clearCart)
  const username = useSelector(getUsername)
  const cart = useSelector(getCart)

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='mt-3 divide-y-2 divide-stone-200 border-b-2 border-stone-200'>
        {cart.map(item => <CartItem item={item} key={item.id} />)}
      </ul>

      <div className='mt-6 space-x-4'>
        <Button type='primary' to="/order/new">Order pizzas</Button>
        <Button handleClick={handleClearCart} type='secondary'>Clear cart</Button>
      </div>
    </div>
  )
}

export default Cart
