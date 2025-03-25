import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";

// const logo = require("../../assets/img/logo.png").default;
import logo from "../../assets/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 300;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Request List", icon: <ListIcon />, path: "/" },
    {
      text: "RequestDetails",
      icon: <DescriptionIcon />,
      path: "/requestDetails",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      {/* <Divider /> */}
      <List sx={{ paddingLeft: 5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        // color="primary"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          // paddingLeft: 5,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.layoutPrimary,
          },
          bgcolor: "black",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: " center",
          }}
        >
          <Avatar
            alt="logo"
            src={logo}
            sx={{ width: "100px", height: "100px", mt: 2 }}
          />
          <Typography
            variant="h5"
            sx={{
              mt: 1,
              background: "linear-gradient(45deg, #004aad, #38b6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 650,
            }}
          >
            Ayurva
          </Typography>
        </Box>
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          //   color="primary"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: `rgba(0, 0, 0, 0)`,
            boxShadow: "none",
            color: theme.palette.text.layoutSecondary,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              List of the Requests
            </Typography>
            <Button
              endIcon={<LogoutIcon />}
              sx={{ ml: "auto", textTransform: "none" }}
              onClick={() => navigate("/login")}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
