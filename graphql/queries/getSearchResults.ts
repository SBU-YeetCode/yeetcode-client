import gql from 'graphql-tag'

export const GetSearchResults = gql`

query GetSearchResults($query: String!, $cursor: String, $amount: Int) {
    getSearch(query: $query, cursor: $cursor, amount: $amount) {
        hasMore
        nextCursor
        nodes {
            _id
            title
            rating
            createdBy
            tags
            title
            codingLanguage
            difficulty
            description
            playCount
        }
    }
}
`