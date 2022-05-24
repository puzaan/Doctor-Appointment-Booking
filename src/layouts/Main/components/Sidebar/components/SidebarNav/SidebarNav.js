import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="XYB"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={mode === 'light' ? '/xyba_logo.png' : '/xyba_logo.png'}
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <Typography
            style={{ textDecoration: 'none' }}
            color="text.primary"
            component={NavLink}
            variant={'h5'}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            About Us
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{ textDecoration: 'none' }}
            color="text.primary"
            component={NavLink}
            variant={'h5'}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/"
          >
            Our Specialist
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{ textDecoration: 'none' }}
            color="text.primary"
            component={NavLink}
            variant={'h5'}
            activeStyle={{
              color: 'text.primary',
              fontWeight: 700,
            }}
            to="/about"
          >
            Our Health Tech
          </Typography>
        </Box>
        {/* <Box>
          <Typography
            style={{ textDecoration: 'none' }}
            color="text.primary"
            component={NavLink}
            variant={'h5'}
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
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
