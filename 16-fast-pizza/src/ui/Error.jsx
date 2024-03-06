import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

function Error () {
  const error = useRouteError()

  return (
    <div className='px-4 py-6'>
      <div className='bg-red-200 px-4 py-5 text-red-500 rounded-lg text-center'>
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
      </div>
      <div className='text-center'>
        <LinkButton to='-1'>
          &larr; Go back
        </LinkButton>
      </div>
    </div>
  )
}

export default Error
