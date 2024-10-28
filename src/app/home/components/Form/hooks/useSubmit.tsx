import { UseFormReset } from "react-hook-form";
import { updateMovie } from "../../../../../modules/fetch/movies";
import useNotificationContext from "../../../context/useNotificationContext";
import useGetMovies from "../../../hooks/useGetMovies";
import { FormValues } from "../@types/form-types";

function useSubmit(reset: UseFormReset<FormValues>) {
  const { mutate } = useGetMovies();
  const [, setState] = useNotificationContext();

  async function onSubmit({ review, selected }: FormValues) {
    const response = await updateMovie(selected, review);
    reset();
    setState({
      isOpen: true,
      message: response.message,
    });
    mutate();
    return response;
  }

  return onSubmit;
}

export default useSubmit;
