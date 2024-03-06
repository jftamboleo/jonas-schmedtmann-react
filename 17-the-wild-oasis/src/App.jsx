import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: var(--color-brand-700);
  color: white;
  border-radius: var(--border-radius-sm);
  margin-bottom: 12px;
  text-align: center;
  text-transform: uppercase;
`

const StyledApp = styled.div`
  background-color: var(--color-brand-100);
  padding: 1rem;
`

export default function App () {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => { alert('Check in') }}>Check in</Button>
      </StyledApp>
    </>
  )
}
