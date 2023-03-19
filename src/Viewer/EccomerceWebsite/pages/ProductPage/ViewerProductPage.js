import classes from "./ViewerProductPage.module.css";
import ViewerProductCard from "../../components/ProductCard/ViewerProductCard";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Sort } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
function ViewerProducts({ productIds }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortfunc, setSortFunc] = useState(false);

  
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortOrder =  (order) => {
    setSortOrder(order);
    setSortFunc(true);

    handleSortClose();

  };

  var searched;

  const handleSearchBar = (event) => {
    setSearchQuery(event.target.value);
    searched = searchQuery;
  };

  return (
    <div>
        <AppBar
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            width: "100%",
          }}
          position="static"
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center"

            }}
          >
            <Search style={{width:'50%'}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search ..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchBar}
              />
            </Search>
            <IconButton onClick={handleSortClick}>
          <Sort />
        </IconButton>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={() => handleSortOrder("low-to-high")}>
            Price: Low to High
          </MenuItem>
          <MenuItem onClick={() => handleSortOrder("high-to-low")}>
            Price: High to Low
          </MenuItem>
        </Menu>
          </Toolbar>
        </AppBar>
    
        {/* <Input
          className={classes.searchbar}
          onChange={handleSearchBar}
          placeholder="    Search "
        ></Input> */}
    
      <ViewerProductCard
      sortOrder={sortOrder} sortfunc={sortfunc}
        productIds={productIds}
        searchedquery={searchQuery}
      ></ViewerProductCard>
    </div>
  );
}
export default ViewerProducts;
