import { Container, CssBaseline } from "@mui/material";
import HomePage from "./home/Page";
import NotificationContextProvider from "./home/context/NotificationContext";

const App = () => {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <NotificationContextProvider>
        <HomePage />
      </NotificationContextProvider>
    </Container>
  );
};

export default App;
