import { useContext } from 'react'
import { Context } from '../contexts/ConfirmProvider'

export default function useConfirm(): (...args: any) => void {
	return useContext(Context) as any
}
