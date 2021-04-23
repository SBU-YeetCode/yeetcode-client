import gql from 'graphql-tag'
export const GET_GAME_EDIT = gql`
	query GetGameEdit($id: String!) {
		getGame(id: $id) {
			_id
			createdBy
			roadmap {
				_id
				parent
				sequence
				kind
				refId
			}
			title
			description
			levels {
				_id
				title
				description
			}
			stages {
				_id
				title
				description
			}
			codingLanguage
			difficulty
			tags
			questions {
				_id
				title
				description
				timeLimit
				points
				lives
				hints {
					_id
					description
					timeToReveal
				}
				gameType
				multipleChoice {
					prompt
					correctChoice
					incorrectChoices
				}
				fillInTheBlank {
					prompt
					solutions
				}
				spotTheBug {
					prompt
					bugLine
					code
				}
				liveCoding {
					prompt
					exampleSolutionCode
					exampleSolutionDescription
				}
				matching {
					prompt
					matching {
						pairOne
						pairTwo
					}
				}
			}
		}
	}
`
