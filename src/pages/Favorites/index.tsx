import { useContext, useMemo } from "react";
import { SearchAppBar } from "../../components/SearchAppBar";
import { FavoriteContext } from "../../context/Favorite";
import {
  ResultCard,
  ResultCardContent,
} from "../../components/SearchAppBar/styles";
import { Button, Rating, Typography } from "@mui/material";
import { EmptyContainer } from "./styles";

export const Favorites: React.FC = () => {
  const { favoriteList, onRemoveFavorite, onRateFavorite } =
    useContext(FavoriteContext);

  const updatedList = useMemo(() => {
    if (!favoriteList.length) {
      return (
        <EmptyContainer>
          <Typography variant="h6">No favorites here.</Typography>
          <Typography variant="body1">
            Please go back at home and fav any repo you like :)
          </Typography>
        </EmptyContainer>
      );
    }
    return favoriteList.map((repo) => (
      <ResultCard key={repo.id} square>
        <ResultCardContent>
          <Typography variant="h6" gutterBottom>
            {repo.name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={repo.rating}
            onChange={(_, newValue) => onRateFavorite(repo.id, newValue)}
          />
        </ResultCardContent>
        <Button size="small" onClick={() => onRemoveFavorite(repo.id)}>
          Remove Favorite
        </Button>
      </ResultCard>
    ));
  }, [favoriteList, onRateFavorite, onRemoveFavorite]);

  return (
    <div>
      <SearchAppBar />
      {updatedList}
    </div>
  );
};
