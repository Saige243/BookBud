import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { PrimaryButton } from './Buttons'

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

export default function BasicModal({ modalText, bookId }) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <div>
      <button onClick={handleOpen}>{modalText}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add to list</p>
          <hr />
          <input
            type="radio"
            id="wantToRead"
            name="fav_language"
            value="Want to Read"
          />
          <label htmlFor="wantToRead">Want to Read</label>
          <br />
          <input
            type="radio"
            id="currentlyReading"
            name="fav_language"
            value="Currently Reading"
          />
          <label htmlFor="currentlyReading">Currently Reading</label>
          <br />
          <input
            type="radio"
            id="finished"
            name="fav_language"
            value="Finished"
          />
          <label htmlFor="finished">Finished</label>
          <br />
        </Box>
      </Modal>
    </div>
  )
}
