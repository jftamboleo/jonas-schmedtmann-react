import styled, { css } from 'styled-components'

const test = css`
  text-align: center;
  text-transform: uppercase;
`

const Heading = styled.h1`
  ${props => props.as === 'h1' &&
  css`
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 12px;
    `
  }
  ${props => props.as === 'h2' &&
  css`
    font-size: 24px;
    font-weight: 700;
    `
  }
  ${props => props.as === 'h3' &&
  css`
    font-size: 24px;
    font-weight: 600;
    `
  }
`

export default Heading
