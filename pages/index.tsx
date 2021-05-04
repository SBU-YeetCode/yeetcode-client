import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage'

export default function index() {
	return (
		<>
			<Head>
				<title>YeetCode</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<HomePage/>
		</>
	)
}
