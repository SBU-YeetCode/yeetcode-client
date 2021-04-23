import create, { State } from 'zustand'
import {
	Level,
	LevelProgress,
	Question,
	QuestionProgress,
	RoadmapObject,
	Stage,
	StageProgress,
} from '../../graphql/generated'

export interface StoreState extends State {
	selectedId: string
	selectedValue: Level | Question | Stage | null
	selectedProgress: LevelProgress | QuestionProgress | StageProgress | null
	selectedRoadmap: RoadmapObject | null
	kind: 'Level' | 'Stage' | 'Question' | null
	selectedAnswer: string | null
	refetch: any
	updateRefetch: (fetcher: any) => void
	updateSelected: (
		kind: 'Level' | 'Stage' | 'Question' | null,
		value: Level | Question | Stage,
		progress: LevelProgress | QuestionProgress | StageProgress | null,
		roadmap: RoadmapObject | null
	) => void
	updateAnswer: (answer: string | null) => void
}

export const useStore = create<StoreState>((set) => ({
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
