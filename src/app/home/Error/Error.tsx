import { Box, Button, Typography } from "@mui/material";

export const Error = () => {
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
        <Typography variant="h2">Error</Typography>
        <Typography variant="body1">Oops... Something went wrong</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Please Try Again
        </Button>
      </Box>
    </>
  );
};
