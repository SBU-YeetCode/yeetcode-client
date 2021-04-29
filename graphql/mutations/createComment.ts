import gql from 'graphql-tag'

export const CreateComment = 
gql`

    mutation CreateComment($comment: CommentInput!, $userId: ObjectId!) {
        createComment(comment: $comment, userId: $userId) {
            _id
        }
    }

`