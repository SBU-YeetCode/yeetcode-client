import '../styles/globals.css'
import ContextWrapper from '../contexts/ContextWrapper'
import Layout from '../components/Layout/Layout'

function MyApp({ Component, pageProps }) {
	return (
		<ContextWrapper>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ContextWrapper>
	)
}

export default MyApp
