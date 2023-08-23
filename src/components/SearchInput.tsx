import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function SearchInput({
  variant,
  styles,
  label,
  inputProps,
  onSubmit,
}) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        margin: 1,
        overflow: 'hidden',
        borderRadius: '40px',
        boxShadow: 'none',
      }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(searchTerm)
      }}
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant={variant}
        sx={styles}
        InputProps={inputProps}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  )
}
