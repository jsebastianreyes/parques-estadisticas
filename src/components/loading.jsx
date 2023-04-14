import styled from 'styled-components'
import loading from '../assets/cute-loading.gif'

const LoadingStyled = styled.div`
    block-size: 100vh;
    background-size: cover;
    background-position: center;
`

function Loading() {
    return (
        <LoadingStyled style={{backgroundImage: `url(${loading})`}}>
            
        </LoadingStyled>
    )
}

export default Loading
