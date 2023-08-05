import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import debounce from 'lodash.debounce';

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { useState } from "react";
import axios from "axios";
import { SEARCH_REPOSITORIES } from "../../queries";
import { GITHUB_PERSONAL_TOKEN } from "../../constants/Github";

interface Repository {
  node: {
    name: string;
    owner: {
      login: string;
    };
    description: string;
    url: string;
  };
}

export const SearchAppBar: React.FC = () => {
  
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<Repository[]>([]);

   // Define the debounced search function
   const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery) {
      const variables = {
        query: `topic:${searchQuery}`,
        count: 10,
      };

      const response = await axios.post(
        'https://api.github.com/graphql',
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
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
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
        
      </Toolbar>
    </AppBar>
    <ul>
        {repos.map((repo) => (
          <li key={repo.node.url}>
            <a href={repo.node.url}>{repo.node.name}</a> - {repo.node.owner.login}<br />
            {repo.node.description}
          </li>
        ))}
      </ul>
  </Box>
);
}