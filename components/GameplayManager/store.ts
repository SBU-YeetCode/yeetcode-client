import create, { State } from 'zustand'
import {
	Level,
	LevelProgress,
	Question,
	QuestionProgress,
	RoadmapObject,
	Stage,
	StageProgress,
	SubmittedAnswer
} from '../../graphql/generated'

export interface StoreState extends State {
	selectedId: string
	selectedTabIndex: number | null
	selectedValue: Level | Question | Stage | null
	selectedProgress: LevelProgress | QuestionProgress | StageProgress | null
	selectedRoadmap: RoadmapObject | null
	kind: 'Level' | 'Stage' | 'Question' | null
	selectedAnswer: SubmittedAnswer | null
	refetch: any
	updateRefetch: (fetcher: any) => void
	updateSelected: (
		kind: 'Level' | 'Stage' | 'Question' | null,
		value: Level | Question | Stage,
		progress: LevelProgress | QuestionProgress | StageProgress | null,
		roadmap: RoadmapObject | null
	) => void
	updateAnswer: (answer: SubmittedAnswer | null) => void
	updateTab: (newIndex: number) => void
}

export const useStore = create<StoreState>((set) => ({
	selectedTabIndex: null,
	updateTab: (newIndex) => {
		set({
			selectedTabIndex: newIndex
		})
	},
	selectedId: '',
	selectedValue: null,
	selectedProgress: null,
	selectedRoadmap: null,
	kind: null,
	selectedAnswer: null,
	updateSelected: (kind, value, progress, roadmap) => {
		set({
			selectedId: value._id,
			kind,
			selectedValue: value,
			selectedProgress: progress,
			selectedRoadmap: roadmap,
			// @ts-expect-error
			selectedTabIndex: progress?.completed ? 2 : progress?.dateStarted ? 1 : 0,
		})
	},
	refetch: null,
	updateRefetch: (fetcher) => {
		set({
			refetch: fetcher,
		})
	},
	updateAnswer: (answer) => {
		set({
			selectedAnswer: answer,
		})
	},
}))
