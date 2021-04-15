import '../styles/globals.css'
import ContextWrapper from '../contexts/ContextWrapper'
import Navbar from '../components/Navbar/Navbar'

function MyApp({ Component, pageProps }) {
	return (
		<ContextWrapper>
			<Navbar />
			<Component {...pageProps} />
		</ContextWrapper>
	)
}

export default MyApp
