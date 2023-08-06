import { styled, Paper } from "@mui/material";

export const ResultCard = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  }));
  
  export const ResultCardContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1, 2, 1, 2),
    "& div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  }));
  