import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

export const loader = async () => {
  const menu = await getMenu()
  return menu
}

function Menu () {
  const menu = useLoaderData()
  return (
    <ul className='divide-y-2'>
      {menu.map(pizza => <MenuItem key={pizza.id} pizza={pizza} />)}
    </ul>
  )
}

export default Menu
