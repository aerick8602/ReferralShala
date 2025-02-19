import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";

import { redirect, usePathname } from "next/navigation";
import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";

export default function AccountMenu({ userId, userType, clerkID }) {
  const { user } = useUser();
  const Name = user?.firstName?.charAt(0).toUpperCase() || "?";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSettingOpen, setSettingOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const pathname = usePathname(); // Get current route
  const isHomePage = pathname === "/"; // Check if on "/"

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openSettings = () => {
    setSettingOpen(true);
    handleClose();
  };

  if (isSettingOpen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 5,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(1px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000, // Ensures it's above everything
        }}
        onClick={() => setSettingOpen(false)} // Close when clicking outside
      >
        <div onClick={(e) => e.stopPropagation()}>
          <UserProfile />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "60px",
        }}
      >
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            style={{ marginLeft: "10px" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "white",
                color: "#FE5757",
                border: "2px solid #FE5757",
                fontSize: "16px",
                fontWeight: "bold",
                background: "transparent",
              }}
            >
              {Name}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          style: {
            overflow: "visible",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
            marginTop: "10px",
            borderRadius: "8px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            if (!userId) {
              redirect("/");
            } else {
              redirect(`/profile/${userId}`);
            }
          }}
        >
          Profile
        </MenuItem>

        <MenuItem onClick={() => redirect("/dashboard")}>Dashboard</MenuItem>
        <Divider />

        {isHomePage && (
          <MenuItem onClick={openSettings}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <SignOutButton>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                padding: "0px 0px",
                width: "140%",
                // textAlign: "left",
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </button>
          </SignOutButton>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
