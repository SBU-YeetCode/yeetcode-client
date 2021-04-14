import {useUser} from '../../../contexts/UserContext'
import {useContextGetMeQuery} from '../../../graphql/generated'
export default function GameEdit() {
	const {data, isLoading, error, refetch} = useContextGetMeQuery()
	console.log(data)
	const {user} = useUser()
	// console.log(user)
	return (
		<>
		<h1>Hello {`${user ? user.name : "lame"}!`}</h1>
		</>
	)
}
