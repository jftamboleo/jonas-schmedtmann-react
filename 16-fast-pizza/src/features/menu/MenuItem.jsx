import { useDispatch, useSelector } from 'react-redux'
import { addItem, deleteItem, getCart } from '../cart/cartSlice'
import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'

function MenuItem ({ pizza }) {
  const dispatch = useDispatch()
  const cart = useSelector(getCart)
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  const isInCart = cart.findIndex(item => item.id === id)

  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice
    }
    dispatch(addItem(newItem))
  }

  const handleRemoveFromCart = () => {
    dispatch(deleteItem(id))
  }

  return (
    <li className='flex gap-4'>
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className='flex flex-col w-full grow'>
        <p className='font-bold'>{name}</p>
        <p className='mt-0.5 text-sm italic text-stone-700 capitalize'>{ingredients.join(', ')}</p>
        <div className='text-stone-700 uppercase font-medium mt-auto text-sm flex items-center justify-between'>
          {!soldOut
            ? <p>{formatCurrency(unitPrice)}</p>
            : <p>Sold out</p>}
          {!soldOut &&
            (isInCart === -1
              ? (<Button handleClick={handleAddToCart} type='small'>
                  Add To Cart
                </Button>)
              : (<Button handleClick={handleRemoveFromCart} type='smallRed'>
                  Remove Item
                </Button>))
          }
        </div>
      </div>
    </li>
  )
}

export default MenuItem
