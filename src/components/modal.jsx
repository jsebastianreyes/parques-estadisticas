import styled from 'styled-components'
import Overlay from './overlay'

const ModalStyled = styled.div`
  color: white;
  background: #ffffffd9;
  padding: 1.5rem;
  border-radius: .5rem;
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-inline-size: 20rem;
  inline-size: 100%;
  border: 1px solid #fff;
  /* margin-inline: 2rem; */

  input{
    border: 2px solid #eee;
    border-radius: .5rem;
    padding: .2rem 1rem;
    font: var(--body-regular);
  }

  img.profilePhoto{
        inline-size: 100px;
        block-size: 100px;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 1px 1px 5px #000;
        box-sizing: border-box;
    }

  .editButton{
    font-size: 2rem;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }

  .editButton:active{
    transform: scale(.9);
  }
  
  .container-imgButton{
    position:relative;
    block-size:100px;
    inline-size:100px;
    border-radius: 50%;
    overflow: hidden;
  }

  .container-imgButton img, .container-imgButton button{
    position: absolute;
  }

  .container-imgButton button{
    block-size:100%;
    inline-size: 100%;
    background: transparent;
    border: 0;
    background: #00000056;
    color: #fff;
    font-size:2rem;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .modalWinner{
    color: red;
  }

  .modalWinner{
    color: #000;
    font: var(--body-regular);
    text-align: center;
    font-weight: 400;
    font-size: 2.5rem;
    line-height: 3rem;
    margin: 0;
  }
    
`

function Modal({children, id}) {
    return (
        <Overlay>
            <ModalStyled id={id}>
                {children}
            </ModalStyled>
        </Overlay>
       
    )
}

export default Modal
