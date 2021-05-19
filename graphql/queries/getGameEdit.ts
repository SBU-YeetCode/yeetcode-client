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
					_id
					prompt
					correctChoice
					incorrectChoices
				}
				fillInTheBlank {
					_id
					prompt
					solutions
				}
				spotTheBug {
					_id
					prompt
					bugLine
					code
				}
				liveCoding {
					_id
					prompt
					exampleSolutionCode
					exampleSolutionDescription
					matcherCode
					starterCode
					stdin
				}
				matching {
					_id
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
