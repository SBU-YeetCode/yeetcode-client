import gql from 'graphql-tag'

export const GET_FILTER_GAMES = 
gql`

query getFilterGames($amount: Int!, $cursor: String, $language: LANGUAGES, $sort: SORT_OPTIONS,$sortDir: Int) {
    getFilterGames(amount: $amount, cursor: $cursor, language: $language, sort: $sort, sortDir: $sortDir) {
        nodes {
            title
            difficulty
            createdBy
            rating
            description
            codingLanguage
            _id
        }
        hasMore
        nextCursor
    }
}

`