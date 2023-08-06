import { useContext, useMemo } from "react";
import { SearchAppBar } from "../../components/SearchAppBar";
import { FavoriteContext } from "../../context/Favorite";

import { Button, Rating, Typography } from "@mui/material";
import { FavoriteCard, FavoriteCardContent } from "./styles";
import { EmptyResults } from "../../components/EmptyResults";

export const Favorites: React.FC = () => {
  const { favoriteList, onRemoveFavorite, onRateFavorite } =
    useContext(FavoriteContext);

  const updatedList = useMemo(() => {
    if (!favoriteList.length) {
      return (
        <EmptyResults
          title="No favorites here."
          description=" Please go back at home and fav any repo you like :)"
        />
      );
    }
    return favoriteList.map((repo) => (
      <FavoriteCard key={repo.id} square>
        <FavoriteCardContent>
          <Typography variant="h6" gutterBottom>
            {repo.name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={repo.rating}
            onChange={(_, newValue) => onRateFavorite(repo.id, newValue)}
          />
        </FavoriteCardContent>
        <Button size="small" onClick={() => onRemoveFavorite(repo.id)}>
          Remove Favorite
        </Button>
      </FavoriteCard>
    ));
  }, [favoriteList, onRateFavorite, onRemoveFavorite]);

  return (
    <div>
      <SearchAppBar />
      {updatedList}
    </div>
  );
};
