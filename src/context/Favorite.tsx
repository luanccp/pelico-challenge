import { createContext, useCallback, useState } from "react";
import { Repository } from "../models/Repository";

interface FavoriteContextProps {
  favoriteList: Repository[];
  onAddFavorite: (repo: Repository) => void;
  onRemoveFavorite: (id: number) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps>(
  {} as FavoriteContextProps
);

export const FavoriteContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favoriteList, setFavoriteList] = useState<Repository[]>([]);

  const onAddFavorite = useCallback((repo: Repository) => {
    setFavoriteList((prev) => [...prev, repo]);
  }, []);

  const onRemoveFavorite = useCallback((id: number) => {
    setFavoriteList((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteList,
        onAddFavorite,
        onRemoveFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
