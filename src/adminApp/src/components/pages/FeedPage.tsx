import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import API from '../../config/requests'

export const FeedPage: FC = () => {
  const [postsPage, setPostsPage] = useState<Page<Post>>({
    count: 0,
    results: [],
  })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    API.getPostsPage({ page: 1 }).then((result) => setPostsPage(result))
  }

  const renderTable = (): JSX.Element => {
    if (postsPage.count === 0) {
      return (
        <Container>
          <Typography>There's nothing to display</Typography>
        </Container>
      )
    }

    return (
      <>
        <Stack>
          <Typography variant="h4">News feed</Typography>
          <Typography variant="caption">{`${postsPage.count} entries`}</Typography>
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell align="right">
                  <b>Content</b>
                </TableCell>
                <TableCell align="right">
                  <b>Author</b>
                </TableCell>
                <TableCell align="right">
                  <b>Published at</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postsPage.results.map((post) => (
                <TableRow
                  key={post.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {post.content}
                  </TableCell>
                  <TableCell align="right">{post.author}</TableCell>
                  <TableCell align="right">{post.published_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  return <Container maxWidth="lg">{renderTable()}</Container>
}
