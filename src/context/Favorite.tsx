import { createContext, useCallback, useState } from "react";

interface FavoriteRepo {
  id: number;
  name: string;
  rating?: number;
}

interface FavoriteContextProps {
  favoriteList: FavoriteRepo[];
  onAddFavorite: (repo: FavoriteRepo) => void;
  onRemoveFavorite: (id: number) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps>(
  {} as FavoriteContextProps
);

export const FavoriteContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favoriteList, setFavoriteList] = useState<FavoriteRepo[]>([]);

  const onAddFavorite = useCallback((repo: FavoriteRepo) => {
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
