import { extendTheme } from '@chakra-ui/react'

const colors = {
	background: {
		dark: {
			primary: '#1A202C',
			500: '#718096',
			700: '#2d3748',
		},
		light: {
			primary: '#1A202C',
			500: '#718096',
			700: '#2d3748',
		},
	},
	primary: {
		50: '#E6FFFA',
		100: '#B2F5EA',
		200: '#81E6D9',
		300: '#38B2AC',
		400: '#38b2ac',
		500: '#319795',
		600: '#2c7a7b',
		700: '#285e61',
		800: '#234e52',
		900: '#1d4044',
	},
	secondary: {
		50: '#fff5f5',
		100: '#fed7d7',
		200: '#feb2b2',
		300: '#fc8181',
		400: '#f56565',
		500: '#e53e3e',
		600: '#c53030',
		700: '#9b2c2c',
		800: '#822727',
		900: '#63171b',
	},
}

const config: any = {
	initialColorMode: 'dark',
}

const theme = extendTheme({ colors, config })

export default theme
