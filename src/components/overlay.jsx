import styled from 'styled-components'

const OverlayStyled = styled.div`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
  z-index: 2;
  background-color: #000000ac;
  padding-inline: 2rem;
`

function Overlay({ children }) {
  return (
    <OverlayStyled>
      {children}
    </OverlayStyled>
  )
}

export default Overlay
