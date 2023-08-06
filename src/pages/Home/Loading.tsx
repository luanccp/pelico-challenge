import { LinearProgress, Skeleton } from "@mui/material";

export const HomeLoading: React.FC = () => (
  <div>
    <LinearProgress />
    {[1, 2, 3].map((i) => (
      <Skeleton
        key={i}
        animation="wave"
        variant="rectangular"
        sx={{ width: "100%", marginY: 2 }}
        height={160}
      />
    ))}
  </div>
);
