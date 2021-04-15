import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/UserContext'

export default function GameEdit() {
	// This page handles the route for /game/edit/:gameId
	const router = useRouter()
	const { user, isLoggedIn } = useUser()
	if (!isLoggedIn()) router.push('/')
	const { gameId } = router.query
	return (
		<div>
			<h1>Game Edit Page</h1>
			<p>Game ID: {gameId}</p>
		</div>
	)
}
