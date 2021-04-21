import '../styles/globals.css'
import ContextWrapper from '../contexts/ContextWrapper'
import Layout from '../components/Layout/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }) {
	return (
		<ContextWrapper>
			<Layout>
			<ReactQueryDevtools />
				<Component {...pageProps} />
			</Layout>
		</ContextWrapper>
	)
}

export default MyApp
