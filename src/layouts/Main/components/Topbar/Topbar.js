import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="XYB"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? '/xyba_logo.png'
              : '/xyba_logo.png'
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box marginLeft={4}>
          <Typography
            style={{ textDecoration: 'none' }}
            color={linkColor}
            component={NavLink}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            About Us
          </Typography>
        </Box>
        <Box marginLeft={4}>
          <Typography
            style={{ textDecoration: 'none' }}
            color={linkColor}
            component={NavLink}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            Our Specialist
          </Typography>
        </Box>
        <Box marginLeft={4}>
          <Typography
            style={{ textDecoration: 'none' }}
            color={linkColor}
            component={NavLink}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            Our Health Tech
          </Typography>
        </Box>
        {/* <Box marginLeft={4}>
          <Typography
            style={{ textDecoration: 'none' }}
            color={linkColor}
            component={NavLink}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            Contact Us
          </Typography>
        </Box> */}
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
