import React, { FC, useContext, useEffect, useMemo } from "react";
import { Stack } from "@mui/system";
import { Button, IconButton, OutlinedInput, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import { useFormik } from "formik";

import { ResponsiveModal } from "../UI/ResponsiveModal";
import API from "../../config/requests";
import { FeedPageContext } from "../pages/FeedPage";

type Props = {
  createMode?: boolean;
  post: Partial<Post> | undefined;
  onClose: () => any;
};

export type PostBase = Pick<Post, "title" | "content" | "author">;

export const PostEditModal: FC<Props> = (props) => {
  const { loadPosts } = useContext(FeedPageContext);

  const { createMode, onClose, post } = props;

  const open: boolean = useMemo((): boolean => Boolean(post), [post]);

  const { values, handleChange, setValues, resetForm, handleSubmit } =
    useFormik<PostBase>({
      initialValues: {
        title: "",
        content: "",
        author: "",
      },
      onSubmit: (values: PostBase) => onSubmitPressed(),
    });

  useEffect(() => {
    if (post) {
      setValues(_.pick(post, ["title", "content", "author"]) as PostBase);
    } else {
      resetForm();
    }
  }, [post]);

  const updatePost = (): void => {
    if (!post || !post.id) {
      return;
    }

    API.editPost(post.id, values).then(() => {
      alert("Post updated");
      onClose();
      loadPosts();
    });
  };

  const createPost = (): void => {
    API.createPost(values).then(() => {
      alert("Post created");
      onClose();
      loadPosts();
    });
  };

  const onSubmitPressed = (): void => {
    if (!values.content || !values.title || !values.author) {
      return alert("Please, make sure that all the fields are valid");
    }

    createMode ? createPost() : updatePost();
  };

  return (
    <ResponsiveModal open={open} onClose={onClose}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h6">
          {createMode ? "Create post" : "Edit post"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack direction="column">
        <OutlinedInput
          value={values.title}
          onChange={handleChange("title")}
          placeholder="Title"
          size="small"
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          value={values.author}
          onChange={handleChange("author")}
          placeholder="Author"
          size="small"
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          value={values.content}
          onChange={handleChange("content")}
          placeholder="Content"
          multiline={true}
          size="small"
          sx={{ mb: 2 }}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ width: "100%", mt: 1 }}
      >
        <Button onClick={() => handleSubmit()}>
          <Typography>Save</Typography>
        </Button>
      </Stack>
    </ResponsiveModal>
  );
};
