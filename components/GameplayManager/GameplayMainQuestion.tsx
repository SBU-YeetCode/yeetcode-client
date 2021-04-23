import React, { ReactElement } from 'react'
import {Props} from './GameplayManager'
import { useStore } from './store'

export default function GameplayMain(): ReactElement{
    const [
		selectedProgress,
		selectedRoadmap,
		selectedValue,
	] = useStore((s) => [
		s.selectedProgress,
		s.selectedRoadmap,
		s.selectedValue,
	])

    return <></>
}