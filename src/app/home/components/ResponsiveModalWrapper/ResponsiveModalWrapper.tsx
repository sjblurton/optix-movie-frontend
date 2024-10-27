import { Box, Modal as MuiModal, useMediaQuery } from "@mui/material";

function ResponsiveModalWrapper({
  children,
  handleClose,
  isOpen,
}: {
  children: React.ReactElement;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  if (isMobile) {
    return (
      <MuiModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="write-review"
        data-testid="modal"
      >
        <Box
          sx={{
            position: "absolute",
            width: "95%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            overflow: "scroll",
          }}
        >
          {children}
        </Box>
      </MuiModal>
    );
  }
  return <>{children}</>;
}

export default ResponsiveModalWrapper;
