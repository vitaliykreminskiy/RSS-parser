import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
} from "@mui/material";
import React, { FC, useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { beautifyDate } from "../../helpers/dateConversion";
import { PostEditModal } from "./PostEditModal";
import API from "../../config/requests";
import { FeedPageContext } from "../pages/FeedPage";

type Props = {
  posts: Post[];
};

export const PostsView: FC<Props> = ({ posts }) => {
  const { loadPosts } = useContext(FeedPageContext);
  const [selectedPost, setSelectedPost] = useState<Partial<Post> | undefined>(
    undefined
  );

  const onDeletePressed = (id: number) => {
    const confirmed: boolean = confirm("Are you sure?");

    if (!confirmed) {
      return;
    }

    API.deletePost(id).then(() => {
      alert("Post deleted");
      loadPosts();
    });
  };

  if (posts.length === 0) {
    return (
      <Container>
        <Typography>No posts</Typography>
      </Container>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell>
                <b>Content</b>
              </TableCell>
              <TableCell>
                <b>Author</b>
              </TableCell>
              <TableCell>
                <b>Published</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {post.content}
                </TableCell>
                <TableCell align="right">{post.author}</TableCell>
                <TableCell align="right">
                  {beautifyDate(post.published_at)}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row">
                    <IconButton onClick={() => onDeletePressed(post.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => setSelectedPost(post)}>
                      <ModeEditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PostEditModal
        post={selectedPost}
        onClose={() => setSelectedPost(undefined)}
      />
    </>
  );
};
