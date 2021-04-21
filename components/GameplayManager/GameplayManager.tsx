import React, { ReactElement } from 'react'
import {GetGamePlayingProgressQuery} from '../../graphql/generated'

interface Props {
    data: GetGamePlayingProgressQuery['getGameProgressByUser']    
}

export default function GameplayManager({data}: Props): ReactElement {

    

    return (
        <div>
            
        </div>
    )
}
