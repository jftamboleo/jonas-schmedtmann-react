import { useEffect } from 'react'

export default function Timer ({ secondsRemaining, tick }) {
  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60
  useEffect(() => {
    const intervalId = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <p className='timer'>{minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}</p>
  )
}
