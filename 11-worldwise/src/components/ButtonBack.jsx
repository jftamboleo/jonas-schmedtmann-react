import Button from "./Button"
import { useNavigate } from "react-router-dom"

export default function Buttonback () {
  const navigate = useNavigate()
  return (
    <Button
      type='back'
      handleClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}>
      &larr; Back
    </Button>
  )
}
