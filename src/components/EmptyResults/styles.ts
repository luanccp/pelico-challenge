import { styled } from "@mui/material";

export const EmptyContainer = styled("div")(({ theme }) => ({
    padding: theme.spacing(4, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column'
  }));
  