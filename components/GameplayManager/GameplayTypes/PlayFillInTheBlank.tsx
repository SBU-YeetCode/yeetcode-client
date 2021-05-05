import React, { ReactElement } from 'react'
import { Question } from '../../../graphql/generated'
import FillInTheBlank from '../../FillInTheBlank'
import { useStore } from '../store'

interface Props {
	isEditable?: boolean
}

export default function PlayFillInTheBlank({isEditable = true}: Props): ReactElement {
	const question = useStore((s) => s.selectedValue as Question)
	const updateAnswer = useStore((s) => s.updateAnswer)
	React.useEffect(() => {
		updateAnswer({
			fillInTheBlank: new Array(question.fillInTheBlank?.solutions.length ?? 0).fill(''),
		})
	},[])
	function handleChange(index: number, newVal: string) {
		updateAnswer({
			fillInTheBlank: answers?.map((a, i) => (i === index ? newVal : a)),
		})
	}
	const answers = useStore((s) => s.selectedAnswer?.fillInTheBlank)
	if (!question.fillInTheBlank) return <></>
	return (
		<FillInTheBlank
			editable={isEditable}
			onChange={handleChange}
			prompts={question.fillInTheBlank.prompt}
			solutions={ isEditable ? (answers ?? []) : question.fillInTheBlank?.solutions}
		/>
	)
}
