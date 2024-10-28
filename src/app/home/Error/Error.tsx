import { Box, Button, Typography } from "@mui/material";
import React from "react";

type ErrorProps = {
  title?: string;
  message?: string;
};

function Error({
  title = "Error",
  message = "Oops... Something went wrong",
}: ErrorProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginTop: "20vh",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Please Try Again
        </Button>
      </Box>
    </>
  );
}

export default React.memo(Error);
