import { RoadmapData } from '../components/Roadmap/Roadmap'
import { Level, Stage, Question, RoadmapObject } from '../graphql/generated'

export function convertToRoadmap(
	roadmap: RoadmapObject[],
	levels: Level[],
	stages: Stage[],
	questions: Question[]
): RoadmapData[] {
	let data: RoadmapData[] = []
	let hash: { [key: string]: RoadmapData } = {}
	let root: any
	for (let i = 0; i < roadmap.length; i++) {
		let currItem = roadmap[i]
		let val: Level | Stage | Question
		let toFind: any
		if (currItem.kind === 'Level') toFind = levels
		if (currItem.kind === 'Stage') toFind = stages
		if (currItem.kind === 'Question') toFind = questions
		val = toFind.find((v: any) => v._id === currItem.refId)
		hash[currItem._id] = {
			...currItem,
			title: val.title,
			children: [],
			id: currItem._id,
			parent: currItem.parent,
		}
	}
	for (let i = 0; i < roadmap.length; i++) {
		let currHash = hash[roadmap[i]._id]
		if (currHash.parent && hash[currHash.parent]) {
			hash[currHash.parent].children.push()
		}
	}
	return Object.values(hash).sort((a, b) => a.sequence - b.sequence)
}
