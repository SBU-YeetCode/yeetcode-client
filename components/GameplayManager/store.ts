import create, { State } from 'zustand'
import { Level, LevelProgress, Question, QuestionProgress, RoadmapObject, Stage, StageProgress } from '../../graphql/generated'

export interface StoreState extends State {
	selectedId: string
    selectedValue: Level | Question | Stage | null
    selectedProgress: LevelProgress | QuestionProgress | StageProgress | null
    selectedRoadmap: RoadmapObject | null
    kind: 'Level' | 'Stage' | 'Question' | null
    updateSelected: (kind: 'Level' | 'Stage' | 'Question' | null, value: Level | Question | Stage, progress: LevelProgress | QuestionProgress | StageProgress | null, roadmap: RoadmapObject | null) => void
}

export const useStore = create<StoreState>((set) => ({
	selectedId: '',
    selectedValue: null,
    selectedProgress: null,
    selectedRoadmap: null,
    kind: null,
    updateSelected: (kind, value, progress, roadmap) => {
        set({
            selectedId: value._id,
            kind,
            selectedValue: value,
            selectedProgress: progress,
            selectedRoadmap: roadmap  
        })
    }
}))
