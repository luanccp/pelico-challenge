import React, { useContext, useMemo, useState } from "react";
import { SearchAppBar } from "../../components/SearchAppBar";
import { ResponseRepository } from "../../models/Repository";
import { FavoriteContext } from "../../context/Favorite";
import debounce from "lodash.debounce";
import { SEARCH_REPOSITORIES } from "../../queries";
import { GITHUB_PERSONAL_TOKEN } from "../../constants/Github";
import axios from "axios";
import { HomeLoading } from "./Loading";
import { EmptyResults } from "../../components/EmptyResults";
import { RepositoryCard } from "../../components/RepositoryCard";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<ResponseRepository[]>([]);
  const { onAddFavorite, onFindFavorite } = useContext(FavoriteContext);

  // Define the debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery) {
      setLoading(true);
      const variables = {
        query: `topic:${searchQuery}`,
        count: 10,
      };

      try {
        const response = await axios.post(
          "https://api.github.com/graphql",
          {
            query: SEARCH_REPOSITORIES,
            variables,
          },
          {
            headers: {
              Authorization: `Bearer ${GITHUB_PERSONAL_TOKEN}`,
            },
          }
        );
        setRepos(response.data.data.search.edges);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setRepos([]);
    }
  }, 300); // Debounce delay in milliseconds

  const emptyState = useMemo(() => {
    if (!repos.length) {
      return (
        <EmptyResults
          title="No repositories"
          description="Search for some at the top right corner"
        />
      );
    }
  }, [repos]);

  return (
    <div>
      <SearchAppBar onSearch={debouncedSearch} />
      {loading ? (
        <HomeLoading />
      ) : (
        <div>
          {emptyState}
          {repos.map((repo) => (
            <RepositoryCard
              key={repo.node.url}
              name={repo.node.name}
              description={repo.node.description}
              owner={repo.node.owner}
              isFavorite={!!onFindFavorite(repo.node.databaseId)}
              onPress={() =>
                onAddFavorite({
                  id: repo.node.databaseId,
                  name: repo.node.name,
                  rating: 0,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
