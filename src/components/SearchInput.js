import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchInput({ variant, styles, label, inputProps }) {
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
    >
      <TextField id="outlined-basic" label={label} variant={variant} sx={styles} InputProps={inputProps} />
    </Box>
  );
}
