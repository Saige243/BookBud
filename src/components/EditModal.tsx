import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { PrimaryButton } from './Buttons'
import useBook from '../hooks/useBook'
import AuthContext from '../auth/AuthContext'
import { toast } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function EditModal({
  modalText,
  bookId,
  innerText,
  closeModal,
}: {
  modalText: string | JSX.Element
  bookId: string
  innerText: string
  parentComponent: string
  closeModal?: () => void
}) {
  const { currentUser } = React.useContext(AuthContext)
  const [open, setOpen] = React.useState(false)
  const {
    removeFromWantToRead,
    removeFromCurrentlyReading,
    removeFromFinished,
  } = useBook()

  if (!currentUser) return null

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleConfirm = async () => {
    if (innerText === 'Remove from want to read?') {
      try {
        await removeFromWantToRead(currentUser._id, bookId)
        toast.success(`Removed from want to read!`)
      } catch (error) {
        console.error('Error removing from want to read:', error)
        toast.error('Failed to remove from want to read')
      }
    } else if (innerText === 'Remove from currently reading?') {
      try {
        await removeFromCurrentlyReading(currentUser._id, bookId)
        toast.success(`Removed from currently reading!`)
      } catch (error) {
        console.error('Error removing from currently reading:', error)
        toast.error('Failed to remove from currently reading')
      }
    } else if (innerText === 'Remove from finished?') {
      try {
        await removeFromFinished(currentUser._id, bookId)
        toast.success(`Removed from finished!`)
      } catch (error) {
        console.error('Error removing from finished:', error)
        toast.error('Failed to remove from finished')
      }
    }
  }

  return (
    <div>
      <button onClick={handleOpen}>{modalText}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <Box sx={style}>
          <p className="text-center font-unbounded">{innerText}</p>
          <div className="flex flex-row justify-center">
            <PrimaryButton text="Confirm" onClick={handleConfirm} />
            <PrimaryButton text="Cancel" onClick={() => handleClose()} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
