import { Button } from "../../styles/common"
import { Modal, ModalActions, ModalText, ModalTitle, Overlay } from "./styled"

type Props = {
	open: boolean
	onClose: () => void
	onGoToList: () => void
	onCreateAnother: () => void
}

export default function SuccessModal({
	open,
	onClose,
	onGoToList,
	onCreateAnother,
}: Props) {
	if (!open) return null

	return (
		<Overlay onClick={onClose}>
			<Modal onClick={e => e.stopPropagation()}>
				<ModalTitle>Quiz created 🎉</ModalTitle>
				<ModalText>
					Your quiz has been successfully created.
				</ModalText>

				<ModalActions>
					<Button variant="ghost" onClick={onCreateAnother}>
						Create another
					</Button>

					<Button onClick={onGoToList}>
						Go to quizzes
					</Button>
				</ModalActions>
			</Modal>
		</Overlay>
	)
}