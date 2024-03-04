import { createOrder } from '../../services/apiRestaurant'
import { Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import Button from '../../ui/Button'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15
  }
]

function CreateOrder () {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData()

  const cart = fakeCart

  return (
    <div className='py-6 px-4'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let&apos;s go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <div className='grow'>
            <input
              type='text'
              name='customer'
              required
              className='input w-full'
              placeholder='First name...'
            />
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input
              type='tel'
              name='phone'
              required
              placeholder='Phone number...'
              className='input w-full'
              />
            {formErrors?.phone &&
              <p className='text-sm mt-2 text-red-700 bg-red-100 rounded-lg p-2'>
                {formErrors.phone}
              </p>
            }
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              placeholder='Adress...'
              className='input w-full'
            />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>Want to give your order priority?</label>
        </div>

        <div>
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
        <input type='hidden' name='cart' value={JSON.stringify(cart)} />
      </Form>
    </div>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please provide a phone number. We might need to contact you about your order!'
  }

  if (Object.keys(errors).length !== 0) return errors

  const order = {
    ...data,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart)
  }
  const newOrder = await createOrder(order)
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
