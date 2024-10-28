import { GridColDef } from "@mui/x-data-grid";
import { Movie } from "../../../../../modules/model/movies";
import { toCurrency } from "../../../../../modules/money/toCurrency";
import { useMemo } from "react";

export const useColumns = (): GridColDef<
  Movie & { averageReview: string }
>[] => {
  return useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Title",
        width: 200,
      },
      {
        field: "averageReview",
        headerName: "Rated",
        width: 100,
      },
      {
        field: "company",
        headerName: "Company",
        width: 200,
        valueGetter: ({ name }: { name: string }) => name,
      },
      {
        field: "cost",
        headerName: "Cost",
        width: 110,
        valueFormatter: (cost: number) => `${toCurrency(cost)}`,
      },
      {
        field: "releaseYear",
        headerName: "Release Year",
        width: 100,
      },
    ],
    []
  );
};
