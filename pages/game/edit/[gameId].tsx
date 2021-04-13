import { useRouter } from 'next/router'

export default function GameEdit() {
	// This page handles the route for /game/edit/:gameId
	const router = useRouter()
	const { gameId } = router.query
	return (
		<div>
			<h1>Game Edit Page</h1>
			<p>Game ID: {gameId}</p>
		</div>
	)
}
