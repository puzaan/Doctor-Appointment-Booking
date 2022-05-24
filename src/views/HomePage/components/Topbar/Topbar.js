import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Topbar = ({ colorInvert = false }) => {
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
      paddingTop={3}
    >
      <Box marginLeft={3} >
        <Button
          variant="contained"
          color="primary"
          component="a"
          target="blank"
          href="/"
          size="large"
        >
          LogIn
        </Button>
      </Box>

      <Box
        sx={{ display: { xs: 'flex' } }}
        alignItems={'center'}
        paddingRight={3}
      >
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            activeStyle={{
              color: 'text.primary',
            }}
            to="/"
          >
            About Us
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            activeStyle={{
              color: 'text.primary',
            }}
            to="/"
          >
            Our Specialist
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            activeStyle={{
              color: 'text.primary',
            }}
            to="/"
          >
            Our Health Tech
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            activeStyle={{
              color: 'text.primary',
            }}
            to="/"
          >
            Our Patner Clinic
          </Typography>
        </Box>
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
