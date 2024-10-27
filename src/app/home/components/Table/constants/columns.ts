import { GridColDef } from "@mui/x-data-grid";
import { Movie } from "../../../../../modules/model/movies";
import { toCurrency } from "../../../../../modules/money/toCurrency";

export const columns: GridColDef<Movie & { averageReview: string }>[] = [
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
    valueGetter: (value: { name: string }) => value.name,
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 110,
    valueFormatter: (value: number) => `${toCurrency(value)}`,
  },
  {
    field: "releaseYear",
    headerName: "Release Year",
    width: 100,
  },
];
