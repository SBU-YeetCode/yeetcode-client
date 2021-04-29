import { GamePreviewCommentsQuery } from '../../graphql/generated'

interface Props {
	comment: GamePreviewCommentsQuery['getGameComments']['nodes'][0]
}

export default function CommentCard({ comment }: Props) {
	console.log(Comment)

	return <></>
}
