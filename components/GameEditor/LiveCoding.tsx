import { Question } from '../../graphql/generated'

type Props = {
	instanceState: Question
	setInstanceState: any
}

export default function LiveCoding({ instanceState, setInstanceState }: Props) {
	return <>Live Coding Editor</>
}
