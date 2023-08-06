import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import debounce from "lodash.debounce";

import {
  FavoriteIconWrapper,
  ResultCard,
  ResultCardContent,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styles";
import { useState, useContext } from "react";
import axios from "axios";
import { SEARCH_REPOSITORIES } from "../../queries";
import { GITHUB_PERSONAL_TOKEN } from "../../constants/Github";
import { FavoriteContext } from "../../context/Favorite";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ResponseRepository } from "../../models/Repository";

export const SearchAppBar: React.FC = () => {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<ResponseRepository[]>([]);
  const { onAddFavorite } = useContext(FavoriteContext);

  // Define the debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery) {
      const variables = {
        query: `topic:${searchQuery}`,
        count: 10,
      };

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
    } else {
      setRepos([]);
    }
  }, 300); // Debounce delay in milliseconds

  // Handle input change and trigger debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            onClick={() => nav("/")}
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            Pelico challenge
          </Typography>

          <Search>
            <SearchIconWrapper>
              <Icon>search</Icon>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search a repository"
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={handleInputChange}
            />
          </Search>

          <FavoriteIconWrapper onClick={() => nav("/favorites")}>
            <Icon>star</Icon>
          </FavoriteIconWrapper>
        </Toolbar>
      </AppBar>

      {repos.map((repo) => (
        <ResultCard key={repo.node.url} square>
          <ResultCardContent>
            <Typography variant="h6" gutterBottom>
              {repo.node.name}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {repo.node.description}
            </Typography>

            <div>
              <Avatar
                alt={`${repo.node.owner.login}'s avatar`}
                src={repo.node.owner.avatarUrl}
              />
              <Typography variant="subtitle2" marginLeft={1}>
                {repo.node.owner.login}
              </Typography>
            </div>
          </ResultCardContent>
          <Button
            size="small"
            onClick={() =>
              onAddFavorite({
                id: repo.node.databaseId,
                name: repo.node.name,
                rating: 0,
              })
            }
          >
            Favorite
          </Button>
        </ResultCard>
      ))}
    </Box>
  );
};
