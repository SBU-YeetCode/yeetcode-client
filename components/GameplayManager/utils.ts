import {
	GetGamePlayingProgressQuery,
	Level,
	LevelProgress,
	Question,
	QuestionProgress,
	RoadmapObject,
	Stage,
	StageProgress,
	HintInput,
} from '../../graphql/generated'
import { differenceInMilliseconds } from 'date-fns'

export function getInfoFor(
	kind: 'Level' | 'Stage' | 'Question' | 'Game' | null,
	id: string | undefined,
	data: GetGamePlayingProgressQuery['getGameProgressByUser']
) {
	let item: Level | Question | Stage | undefined
	let itemProgress: LevelProgress | QuestionProgress | StageProgress | undefined
	let itemRoadmap = data!.game.roadmap.find((r) => r.refId === id)
	switch (kind) {
		case 'Level':
			item = data!.game.levels.find((d) => d._id === id)
			itemProgress = data!.levels!.find((l) => l.levelId === id)
			break
		case 'Stage':
			item = data!.game.stages.find((d) => d._id === id)
			itemProgress = data!.stages!.find((l) => l.stageId === id)
			break
		case 'Question':
			item = data!.game.questions.find((d) => d._id === id)
			itemProgress = data!.questions!.find((l) => l.questionId === id)
			break
	}
	return { item, itemProgress, itemRoadmap }
}

export function calculatePoints(
	totalTime: number,
	timeStarted: string,
	totalPoints: number
): number {
	const timeDifference = new Date().getTime() - new Date(timeStarted).getTime()
	// Ensure there is time remaining
	if (timeDifference >= totalTime) {
		return 0
	} else {
		return Math.round((1 - timeDifference / totalTime) * totalPoints)
	}
}

export function getHintInfo(
	hint: HintInput,
	i: number,
	questionProgress: QuestionProgress,
	time: Date
) {
	let color: string = 'gray.400'
	let disabled: boolean = true
	let revealed: boolean = false
	if (questionProgress.hintsRevealed) {
		if (questionProgress.hintsRevealed.includes(hint._id)) {
			color = 'green.400'
			disabled = false
			revealed = true
		} else if (
			questionProgress.dateStarted &&
			differenceInMilliseconds(time, new Date(questionProgress.dateStarted)) >
				hint.timeToReveal
		) {
			color = 'yellow.400'
			disabled = false
		} else {
			color = 'gray.400'
		}
	}
	return { color, disabled, revealed, newReveal: !disabled && !revealed}
}
