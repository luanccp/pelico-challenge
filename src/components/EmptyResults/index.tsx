import { Typography } from "@mui/material";
import { EmptyContainer } from "./styles";

interface Props {
  title: string;
  description?: string;
}

export const EmptyResults: React.FC<Props> = ({ title, description }) => (
  <EmptyContainer>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body1">{description}</Typography>
  </EmptyContainer>
);
