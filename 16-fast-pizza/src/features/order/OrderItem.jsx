import { formatCurrency } from '../../utils/helpers'

function OrderItem ({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item

  return (
    <li className='py-3'>
      <div className='flex items-center justify-between'>
        <p className='space-x-2'>
          <span className='font-bold'>{quantity}&times;</span>
          <span>{name}</span>
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  )
}

export default OrderItem
