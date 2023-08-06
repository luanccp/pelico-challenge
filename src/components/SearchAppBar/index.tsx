import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import {DebouncedFunc} from "lodash";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  FavoriteIconWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";


interface Props {
  onSearch?: DebouncedFunc<(searchQuery: string) => Promise<void>>;
}

export const SearchAppBar: React.FC<Props> = ({ onSearch }) => {
  const nav = useNavigate();

  // Handle input change and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      const newQuery = e.target.value;
      onSearch(newQuery);
    }
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

          {onSearch && (
            <Search>
              <SearchIconWrapper>
                <Icon>search</Icon>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search a repository"
                inputProps={{ "aria-label": "search" }}
                onChange={handleInputChange}
              />
            </Search>
          )}

          <FavoriteIconWrapper onClick={() => nav("/favorites")}>
            <Icon>star</Icon>
          </FavoriteIconWrapper>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
