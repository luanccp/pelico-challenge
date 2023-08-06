import { createContext, useCallback, useState } from "react";
import { Repository } from "../models/Repository";

interface FavoriteContextProps {
  favoriteList: Repository[];
  onAddFavorite: (repo: Repository) => void;
  onRemoveFavorite: (id: number) => void;
  onRateFavorite: (id: number, value: number | null) => void;
  onFindFavorite: (id: number) => Repository | undefined;
}

export const FavoriteContext = createContext<FavoriteContextProps>(
  {} as FavoriteContextProps
);

export const FavoriteContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favoriteList, setFavoriteList] = useState<Repository[]>([]);

  const onAddFavorite = (repo: Repository) => {
    setFavoriteList((prev) => [...prev, repo]);
  };

  const onRemoveFavorite = (id: number) => {
    setFavoriteList((prev) => prev.filter((r) => r.id !== id));
  };

  const onRateFavorite = (id: number, value: number | null) => {
    if (!value) return;
    setFavoriteList((prev) => {
      const findIndex = prev.findIndex((r) => r.id === id);
      if (findIndex >= 0) {
        const updatedItems = [
          ...prev.slice(0, findIndex), // Items before the updated item
          { ...prev[findIndex], rating: value }, // Updated item
          ...prev.slice(findIndex + 1), // Items after the updated item
        ];
        return updatedItems;
      }
      return prev;
    });
  };

  const onFindFavorite = useCallback(
    (id: number) => {
      return favoriteList.find((favorite) => favorite.id === id);
    },
    [favoriteList]
  );

  return (
    <FavoriteContext.Provider
      value={{
        favoriteList,
        onAddFavorite,
        onRemoveFavorite,
        onRateFavorite,
        onFindFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
