import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { PrimaryButton } from './Buttons'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import useBook from '../hooks/useBook'
import AuthContext from '../auth/AuthContext'

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

export default function BasicModal({
  modalText,
  bookId,
}: {
  modalText: string | React.ReactNode
  bookId: string
}) {
  const { currentUser } = React.useContext(AuthContext)
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('')
  const { saveBook, addToCurrentlyReading } = useBook()

  if (!currentUser) return null

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleSave = () => {
    if (!selectedValue) {
      return
    }

    if (selectedValue === 'Add to Want to Read') {
      saveBook(currentUser._id, { bookId: bookId })
    } else if (selectedValue === 'Add to Currently Reading') {
      addToCurrentlyReading(currentUser._id, { bookId: bookId })
    } else if (selectedValue === 'Add to Finished') {
      console.log('Finished')
    }

    handleClose()
  }

  const customSelectStyle = {
    '&:focus': {
      outline: 'none',
    },
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
          <p>Add to list</p>
          <Select
            value={selectedValue}
            onChange={handleSelectChange}
            label="Add to list"
            fullWidth
            sx={customSelectStyle}
          >
            <MenuItem value="Add to Want to Read">Add to Want to Read</MenuItem>
            <MenuItem value="Add to Currently Reading">
              Add to Currently Reading
            </MenuItem>
            <MenuItem value="Add to Finished">Add to Finished</MenuItem>
          </Select>
          <div className="flex justify-center">
            <PrimaryButton text="Save" onClick={handleSave} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
