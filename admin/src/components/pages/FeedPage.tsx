import {
  Button,
  Container,
  IconButton,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC, createContext, useEffect, useMemo, useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import API from '../../config/requests'
import { PostsView } from '../containers/PostsView'
import { PostBase, PostEditModal } from '../containers/PostEditModal'
import { useSession } from '../providers/SessionProvider'

enum SortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

type FeedPageContextType = {
  loadPosts: () => any
}

const PER_PAGE: number = 50
const postBoilerplate: PostBase = {
  author: '',
  title: '',
  content: '',
}

export const FeedPageContext = createContext<FeedPageContextType>({
  loadPosts: () => true,
})

export const FeedPage: FC = () => {
  const [newPost, setNewPost] = useState<PostBase | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NEWEST)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [postsPage, setPostsPage] = useState<Page<Post>>({
    count: 0,
    results: [],
  })

  const { logOut } = useSession()

  useEffect(() => {
    loadPosts()
    setPage(1)
  }, [searchTerm, sortOrder])

  useEffect(() => {
    loadPosts()
  }, [page])

  const totalPages: number = useMemo((): number => {
    return Math.ceil(postsPage.count / PER_PAGE)
  }, [postsPage.count])

  const loadPosts = () => {
    API.getPostsPage({
      page,
      perPage: PER_PAGE,
      search: searchTerm,
      sort: sortOrder,
    }).then((result) => {
      setPostsPage(result)
    })
  }

  const onNewPostPressed = () => setNewPost(postBoilerplate)

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row">
          <Typography variant="h5">News Feed</Typography>
          <Typography
            sx={{ ml: 2 }}
            variant="caption"
          >{`${postsPage.count} entries`}</Typography>
        </Stack>

        <Stack direction="row">
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={onNewPostPressed}
          >
            <Typography>New Post</Typography>
          </Button>
          {/**
           * When search used the results are ordered by relevance so it
           * doesn't make sense to use other orderings
           */}
          {!searchTerm ? (
            <Select
              size="small"
              id="demo-simple-select"
              value={sortOrder}
              sx={{ mr: 1 }}
              onChange={(e: any) => setSortOrder(e.target.value)}
            >
              <MenuItem value={SortOrder.NEWEST}>Newest</MenuItem>
              <MenuItem value={SortOrder.OLDEST}>Oldest</MenuItem>
            </Select>
          ) : null}
          <OutlinedInput
            size="small"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value as string)}
            placeholder="Search"
          />
          <IconButton sx={{ ml: 1 }} onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
        </Stack>
      </Stack>

      <FeedPageContext.Provider value={{ loadPosts }}>
        <PostsView posts={postsPage.results} />
      </FeedPageContext.Provider>

      {postsPage.count > 0 ? (
        <Stack direction="row" justifyContent="center">
          <Pagination
            sx={{ alignSelf: 'center', my: 1 }}
            page={page}
            onChange={(_, page) => setPage(page)}
            count={totalPages}
          />
        </Stack>
      ) : null}

      <PostEditModal
        post={newPost}
        createMode={true}
        onClose={() => setNewPost(undefined)}
      />
    </Container>
  )
}
