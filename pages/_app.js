import '../styles/globals.css'
import ContextWrapper from '../contexts/ContextWrapper'

function MyApp({ Component, pageProps }) {

  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>)
}

export default MyApp
