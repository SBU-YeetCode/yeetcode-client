import gql from 'graphql-tag'

export const GET_POPULAR_GAMES = gql`
	query getPopularGames {
		getFilterGames(amount: 4, cursor: null, sort: PLAY_COUNT, sortDir: 1) {
			nodes {
				createdBy
				title
				rating
				_id
			}
		}
	}
`
