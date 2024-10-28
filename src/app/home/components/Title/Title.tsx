import { Button, Typography } from "@mui/material";
import NumberOfMovies from "./components/NumberOfMovies";
import useGetMovies from "../../hooks/useGetMovies";

function Title() {
  const { data, error, mutate } = useGetMovies();

  if (error) {
    throw error;
  }

  return (
    <>
      <Typography variant="h2" component="h2">
        Welcome to Movie Database!
      </Typography>

      <Typography variant="h3">
        Total Movies Displayed <NumberOfMovies number={data?.length} />
      </Typography>

      <Button
        sx={{
          m: 2,
        }}
        type="button"
        onClick={() => mutate()}
        variant="contained"
      >
        Refresh
      </Button>
    </>
  );
}

export default Title;
