import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle `
  /*React CSS*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: url('https://picfiles.alphacoders.com/274/274035.jpg');
    background-position: center;
    background-attachment: fixed;
  }

  #loginStyle {
    background: url('https://images5.alphacoders.com/307/thumb-1920-307270.jpg');
    background-position: center;
    background-size: 100%;
    
  }

  #ENTRARJA {
    color: #0000FF;
  }
  

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
    return ( 
      <>
        <GlobalStyle/>
        <ThemeProvider theme = { theme } >
            <Component {...pageProps } />  
        </ThemeProvider > 
      </>
    )
}