import { DataGrid } from "@mui/x-data-grid";

import { Skeleton } from "@mui/material";
import useGetMovies from "../../hooks/useGetMovies";
import { columns } from "./constants/columns";

function Table({
  setSelected,
}: {
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { data, error, isLoading } = useGetMovies();

  if (isLoading) {
    return <Skeleton width="100%" height={400} data-testid="skeleton" />;
  }

  if (error || !data) {
    throw error;
  }

  return (
    <>
      <DataGrid
        onRowClick={(params) => {
          setSelected(params.id.toString());
        }}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "rgba(222, 244, 64, 0.4) !important",
          },
        }}
        checkboxSelection
        rows={data}
        columns={columns}
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </>
  );
}

export default Table;
