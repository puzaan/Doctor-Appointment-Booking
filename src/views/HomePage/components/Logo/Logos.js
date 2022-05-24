import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok, FaViber, FaFacebookMessenger } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';

const SocialMedia = () => {
  return (
    <Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        paddingTop={5}
      >
        <Box
          paddingLeft={5}
          display={'flex'}
          justifyContent={'center'}
          alignContent={'center'}
          flexDirection={'column'}
        >
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'facebook'}>
              <FacebookIcon sx={{ fontSize: '60px' }} />
            </IconButton>
          </Box>
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'youtube'}>
              <YouTubeIcon sx={{ fontSize: '60px' }} />
            </IconButton>
          </Box>
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'primary'}>
              <FaTiktok fontSize={'2.57rem'} />
            </IconButton>
          </Box>
        </Box>
        <Box
          paddingTop={20}
          display={'flex'}
          component={Link}
          sx={{ ':hover': { backgroundColor: 'white' } }}
          to="/"
          title="XYB"
          width={{ xs: 100, md: 200 }}
        >
          <Box component={'img'} src={'/xyba_logo.png'} height={1} width={1} />
        </Box>
        <Box
          paddingRight={5}
          display={'flex'}
          justifyContent={'center'}
          alignContent={'center'}
          flexDirection={'column'}
        >
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'facebook'}>
              <PhoneIcon sx={{ fontSize: '50px' }} />
            </IconButton>
          </Box>
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'primary'}>
              <FaFacebookMessenger fontSize={'2.57rem'} />
            </IconButton>
          </Box>
          <Box height={1} width={1}>
            <IconButton size={'large'} color={'primary'}>
              <FaViber fontSize={'2.57rem'} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;
