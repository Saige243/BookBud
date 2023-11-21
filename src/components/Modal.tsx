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
  bgcolor: '#F6F4E4',
  borderRadius: '10px',
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
  const { addToWantToRead, addToCurrentlyReading, addToFinished } = useBook()

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
      addToWantToRead(currentUser._id, bookId)
    } else if (selectedValue === 'Add to Currently Reading') {
      addToCurrentlyReading(currentUser._id, bookId)
    } else if (selectedValue === 'Add to Finished') {
      addToFinished(currentUser._id, bookId)
    }

    handleClose()
  }

  const customSelectStyle = {
    bgcolor: '#F6F4E4',
    outline: 'none',
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
          <p className="font-unbounded pb-2">Add to list</p>
          <Select
            value={selectedValue}
            onChange={handleSelectChange}
            label="Add to list"
            fullWidth
            sx={customSelectStyle}
          >
            <MenuItem value="Add to Want to Read">
              <p className="font-montserrat">Add to Want to Read</p>
            </MenuItem>
            <MenuItem value="Add to Currently Reading">
              <p className="font-montserrat">Add to Currently Reading</p>
            </MenuItem>
            <MenuItem value="Add to Finished">
              <p className="font-montserrat">Add to Finished</p>
            </MenuItem>
          </Select>
          <div className="flex justify-center">
            <PrimaryButton text="Save" onClick={handleSave} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
