import { Favorite, Person, Reviews, Star } from '@mui/icons-material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAuthContext } from 'contexts/AuthContext';
import * as React from 'react';
import Link from 'src/Link';

const SideNavList = () => {
  const { loginState } = useAuthContext();
  const username = loginState.user && loginState.user.username;

  const links = [
    { name: 'Profile', href: `/${username}`, icon: <Person /> },
    { name: 'Favorites', href: `/${username}/favorites`, icon: <Favorite /> },
    { name: 'Ratings', href: `/${username}/ratings`, icon: <Star /> },
    { name: 'Reviews', href: `/${username}/reviews`, icon: <Reviews /> },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav">
        {links.map((link, i) => (
          <ListItemButton key={link.name} component={Link} href={link.href}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SideNavList;
