import Title from "./components/Title/Title";

import { ErrorBoundary } from "react-error-boundary";
import Error from "./Error/Error";
import Table from "./components/Table/Table";
import { useState } from "react";
import Form from "./components/Form/Form";
import Notification from "./components/Notification/Notification";
import ResponsiveModalWrapper from "./components/ResponsiveModalWrapper/ResponsiveModalWrapper";

function HomePage() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Title />
      <br />
      <Table setSelectedMovieId={setSelectedMovieId} />
      <br />
      <ResponsiveModalWrapper
        isOpen={Boolean(selectedMovieId)}
        handleClose={() => setSelectedMovieId(null)}
      >
        <Form selectedMovieId={selectedMovieId} />
      </ResponsiveModalWrapper>
      <Notification />
    </ErrorBoundary>
  );
}

export default HomePage;
