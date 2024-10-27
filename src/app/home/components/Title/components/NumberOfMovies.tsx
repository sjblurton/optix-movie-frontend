import { Skeleton } from "@mui/material";

type NumberOfMoviesProps = {
  number: number | undefined;
};

function NumberOfMovies({ number }: NumberOfMoviesProps) {
  return (
    <>
      {number ? (
        number
      ) : (
        <Skeleton
          sx={{
            display: "inline-block",
            width: 30,
          }}
          data-testid="skeleton"
          variant="text"
          width={30}
          component="span"
        />
      )}
    </>
  );
}

export default NumberOfMovies;
