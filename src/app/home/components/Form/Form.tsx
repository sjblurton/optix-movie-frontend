import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGetMovie from "../../hooks/useGetMovie";
import { FormValues } from "./@types/form-types";
import useSubmit from "./hooks/useSubmit";
import { isReviewValid, isSelectedMovieIdValid } from "./validation/validation";

function Form({ selectedMovieId }: { selectedMovieId: string | null }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      review: "",
    },
  });

  const { data, error } = useGetMovie(selectedMovieId);

  const onSubmit = useSubmit(reset);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (selectedMovieId) {
      setValue("selectedMovieId", selectedMovieId);
    }
  }, [selectedMovieId, setValue]);

  const errorMessage =
    errors.review?.message ?? errors.selectedMovieId?.message;

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "left",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("selectedMovieId", { validate: isSelectedMovieIdValid })}
        hidden
      />
      {data ? (
        <>
          <Typography variant="body1">Selected movie: {data.title}</Typography>
          <Typography variant="body1">Please leave a review below</Typography>
          <TextField
            label="Review:"
            multiline
            {...register("review", {
              validate: isReviewValid,
            })}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </>
      ) : (
        <Typography variant="body1">Please select a movie</Typography>
      )}
    </Box>
  );
}

export default Form;
