import React, { FC } from 'react'
import { useFormik } from 'formik'
import { Container, Stack, Typography, TextField, Button } from '@mui/material'
import RssFeedIcon from '@mui/icons-material/RssFeed'

import { CONFIG } from '../../config/app'
import { useSession } from '../providers/SessionProvider'

export const LoginPage: FC = () => {
  const { logIn } = useSession()
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => logIn(values),
  })

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
          value={values.username}
          size="small"
          onChange={handleChange('username')}
          sx={{ mt: 1 }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={values.password}
          size="small"
          sx={{ mt: 1 }}
          onChange={handleChange('password')}
        />
        <Button
          sx={{ mt: 2 }}
          onClick={() => handleSubmit()}
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Container>
  )
}
