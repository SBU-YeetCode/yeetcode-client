import React, { ReactElement } from 'react'
import {Props} from './GameplayManager'
import { useStore } from './store'
import { Center, Heading, Text } from "@chakra-ui/react"
import MainQuestion from './GameplayMainQuestion'

export default function GameplayMain({data}: Props): ReactElement {
    const [
		selectedProgress,
		kind,
		selectedRoadmap,
		selectedValue,
	] = useStore((s) => [
		s.selectedProgress,
		s.kind,
		s.selectedRoadmap,
		s.selectedValue,
	])

    const instanceKind = useStore(state => state.kind)
    console.log(data)
    console.log(selectedValue?.title)
    const renderSwitch = (param: typeof instanceKind) => {
        switch(param) {
            case 'Level':
            case 'Stage':
                return (
                    <Center mt={6}>
                        <Text>{selectedValue?.description}</Text>
                    </Center>
                )
            case 'Question':
                return (
                    <MainQuestion />
                )
            default:
                return <></>
        }
    }
    return (
        <>
            <Heading textAlign='center'>
				{ selectedValue?.title }
			</Heading>
            {renderSwitch(instanceKind)}
        </>
    )
}
