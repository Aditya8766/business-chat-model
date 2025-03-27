import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import ChatIcon from "@mui/icons-material/Chat";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoopIcon from "@mui/icons-material/Loop";
import "./nav-bar.scss";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        {/* Left-most Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" className="menu-icon">
          <MenuIcon />
        </IconButton>

        {/* Navigation Links (Centered) */}
        <Box className={`nav-links ${mobileMenuOpen ? "show" : ""}`}>
          <Typography className="nav-item"><ListAltIcon /> Queue</Typography>
          <Typography className="nav-item"><ChatIcon /> Chats</Typography>
          <Typography className="nav-item"><AppsIcon /> Apps</Typography>
          <Typography className="nav-item"><LoopIcon /> Flows</Typography>
        </Box>

        {/* Right Section: Search Bar + Profile */}
        <Box className="right-section">
          {/* Search Bar */}
          <Box className="search-bar">
            <SearchIcon className="search-icon" />
            <InputBase placeholder="Quick Find" className="search-input" />
          </Box>

          {/* Profile Icon with Dropdown */}
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
