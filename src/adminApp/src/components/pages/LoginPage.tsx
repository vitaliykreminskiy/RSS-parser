import React, { FC, useState } from 'react'
import { Container, Stack, Typography, TextField, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import RssFeedIcon from '@mui/icons-material/RssFeed'

import { CONFIG } from '../../config/app'

export const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Stack
          sx={{ py: { xs: 3, md: 5 } }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <RssFeedIcon color="primary" />
          <Typography color="primary" variant="h6">
            {CONFIG.APP_NAME}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="column">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          size="small"
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          size="small"
          sx={{ mt: 1 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ mt: 2 }}
          onClick={() => true}
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Container>
  )
}
