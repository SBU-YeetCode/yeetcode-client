import React, { ReactElement, useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
} from '@chakra-ui/react'

interface Props {
	isOpen: boolean
	onClose: () => void
	onUpload: (url: string) => void
}

const initialState = { alt: '', src: '' }

export default function ChangePicture({ isOpen, onClose, onUpload }: Props): ReactElement {
	const [pictures, setPictures] = useState<any>()
	const onDrop = (picture: any) => {
		setPictures(picture)
	}
	const [isLoading, setIsLoading] = useState(false)

	const [{ alt, src }, setPreview] = useState(initialState)

	function handleSave() {
		const { files } = document.querySelector('input[type="file"]') as any
		console.log('Image file', files[0])
        const formData = new FormData()
		formData.append('file', files[0])
		formData.append('upload_preset', 'jkrkxl2n')
		const options = {
			method: 'POST',
			body: formData,
		}

		return fetch('https://api.Cloudinary.com/v1_1/yeetcode/image/upload', options)
			.then((res) => res.json())
			.then((res) => {
                console.log(res.url)
                onUpload(res.url)
            })
			.catch((err) => console.log(err))

	}

	const fileHandler = (event: any) => {
		const { files } = event.target
		setPreview(
			files.length
				? {
						src: URL.createObjectURL(files[0]),
						alt: files[0].name,
				  }
				: initialState
		)
	}
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className='addNew'>
							<img className='preview' src={src} alt={alt} />
							<Input accept='image/*' type='file' onChange={fileHandler} />
						</div>
					</ModalBody>

					<ModalFooter>
						<Button
							isLoading={isLoading}
							disabled={Boolean(pictures)}
							colorScheme='blue'
							mr={3}
							onClick={handleSave}
						>
							Save
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
