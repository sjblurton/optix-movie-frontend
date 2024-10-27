import { Box, Button, TextField, Typography } from "@mui/material";
import get from "lodash.get";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGetMovie from "../../hooks/useGetMovie";
import { FormValues } from "./FormTypes";
import useSubmit from "./hooks/useSubmit";
import { validateReview, validateSelected } from "./validation";

function Form({ selected }: { selected: string | null }) {
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

  const { data, error } = useGetMovie(selected);

  const onSubmit = useSubmit(reset);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (selected) {
      setValue("selected", selected);
    }
  }, [selected, setValue]);

  const errorMessage =
    get(errors, "review.message") || get(errors, "selected.message");

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
      <input {...register("selected", { validate: validateSelected })} hidden />
      {data ? (
        <>
          <Typography variant="body1">Selected movie: {data.title}</Typography>
          <Typography variant="body1">Please leave a review below</Typography>
          <TextField
            label="Review:"
            multiline
            {...register("review", {
              validate: validateReview,
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
