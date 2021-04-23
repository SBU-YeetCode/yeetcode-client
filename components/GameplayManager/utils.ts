import { GetGamePlayingProgressQuery, Level, LevelProgress, Question, QuestionProgress, RoadmapObject, Stage, StageProgress } from '../../graphql/generated'

export function getInfoFor(
	kind: 'Level' | 'Stage' | 'Question' | 'Game' | null,
	id: string | undefined,
	data: GetGamePlayingProgressQuery['getGameProgressByUser']
) {
	let item: Level | Question | Stage | undefined
	let itemProgress: LevelProgress | QuestionProgress | StageProgress | undefined
    let itemRoadmap = data!.game.roadmap.find(r => r.refId === id)
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
