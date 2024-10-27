import { Snackbar } from "@mui/material";
import useNotificationContext from "../../context/useNotificationContext";

function Notification() {
  const [state, setState] = useNotificationContext();

  const handleClose = () => {
    setState({ isOpen: false, message: null });
  };

  return (
    <Snackbar
      open={state.isOpen}
      data-testid="notification-snackbar"
      autoHideDuration={1000}
      message={state.message}
      onClick={handleClose}
    />
  );
}

export default Notification;
