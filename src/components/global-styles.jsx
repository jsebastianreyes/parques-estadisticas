import { createGlobalStyle } from 'styled-components'

const GlobalStylesStyled = createGlobalStyle`

  :root{
    --body-regular:  400 1rem/1.5rem  'Montserrat';
    --title: 400 3rem/2rem 'Rubik Pixels', cursive;
  }
  body{
    margin: 0;
    padding: 0;
    font: var(--body-regular);
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

  }

`



export default GlobalStylesStyled