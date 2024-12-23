import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { redirect } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';

export default function AccountMenu({userId}) {
  const {user}=useUser();
  const Name=user?.firstName.charAt(0).toUpperCase();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("USERID in Menu :",userId)
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 34, height: 34 }} style={{ backgroundColor: 'white', color: '#FE5757',border:'2px solid #FE5757' }}>{Name}</Avatar>
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
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{redirect(`/profile/${userId}`)}} style={{paddingLeft:'20px'}}>
        Profile
        </MenuItem>

        <MenuItem onClick={()=>{redirect('/dashboard')}} style={{paddingLeft:'20px'}}>
        Dashboard
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          
          <SignOutButton>
            <button onClick={()=>{window.location.href='/'}} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <ListItemIcon>
            <Logout fontSize="small" />
            </ListItemIcon>
              <p>Logout</p>
            </button>
          </SignOutButton> 
          
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
} 