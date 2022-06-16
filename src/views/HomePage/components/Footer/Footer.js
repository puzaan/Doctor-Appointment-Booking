import React from 'react';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import SocialMedia from '../SocialMedia';
import { Divider } from '@mui/material';

const Footer = () => {

  return (
    <Box display={'flex'} flexDirection={'column'} paddingLeft={6} width={'100%'}>
      <Box
        display={'flex'}
        justifyContent={'start'}
        component={Link}
        to="/"
        width={100}
      >
        <Box
          component={'img'}
          src={ '/xyba_logo.png'}
          height={1}
          width={1}
        />
      </Box>
      <Box>
        <Divider />
      </Box>
      <Box>
        <SocialMedia />
      </Box>

      {/* <Grid container>
        <Grid item xs={12}>
          <Box
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            width={1}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Box
              display={'flex'}
              component={Link}
              to="/"
              title="theFront"
              width={80}
            >
              <Box
                component={'img'}
                src={mode === 'light' ? '/xyba_logo.png' : '/xyba_logo.png'}
                height={1}
                width={1}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SocialMedia />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Footer;
