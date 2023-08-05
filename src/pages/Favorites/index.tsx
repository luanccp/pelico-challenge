import { useContext } from "react";
import { SearchAppBar } from "../../components/SearchAppBar";
import { FavoriteContext } from "../../context/Favorite";
import {
  ResultCard,
  ResultCardContent,
} from "../../components/SearchAppBar/styles";
import { Button, Typography } from "@mui/material";
import { EmptyContainer } from "./styles";

export const Favorites: React.FC = () => {
  const { favoriteList, onRemoveFavorite } = useContext(FavoriteContext);

  if (!favoriteList.length) {
    return (
      <div>
        <SearchAppBar />
        <EmptyContainer>
          <Typography variant="h6">No favorites here.</Typography>
          <Typography variant="body1">
            Please go back at home and fav any repo you like :)
          </Typography>
        </EmptyContainer>
      </div>
    );
  }

  return (
    <div>
      <SearchAppBar />
      <h2> Favorites</h2>
      {favoriteList.map((repo) => (
        <ResultCard key={repo.id} square>
          <ResultCardContent>
            <Typography variant="h6" gutterBottom>
              {repo.name}
            </Typography>
          </ResultCardContent>
          <Button size="small" onClick={() => onRemoveFavorite(repo.id)}>
            Remove Favorite
          </Button>
        </ResultCard>
      ))}
    </div>
  );
};
