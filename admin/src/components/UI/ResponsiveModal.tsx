import { Box, Modal, Paper } from "@mui/material";
import React from "react";

export interface BaseModalProps {
  children: any;
  onClose: () => any;
  open: boolean;
}

export const ResponsiveModal = ({
  children,
  onClose,
  open,
}: BaseModalProps): JSX.Element => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: "90%",
          maxWidth: "800px",
          bgcolor: "white",
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          maxHeight: "90vh",
          borderRadius: 0.5,
        }}
      >
        <Box sx={{ p: 3 }}>{children}</Box>
      </Paper>
    </Modal>
  );
};
