import React from 'react';
import Box from '@mui/material/Box';
// import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton } from '@mui/material';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaTiktok, FaFacebookMessenger, FaViber } from 'react-icons/fa';
import PhoneIcon from '@mui/icons-material/Phone';


const SocialMedia = () => {
  return (
    <Box display={'flex'} flexWrap={'wrap'}>
      <Box
        marginTop={1}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <IconButton size={'large'} color={'facebook'}>
            <FacebookIcon sx={{ fontSize: '30px' }} />
          </IconButton>
          <IconButton size={'large'} color={'youtube'}>
            <YouTubeIcon sx={{ fontSize: '30px' }} />
          </IconButton>
          <IconButton color={'primary'}>
            <FaTiktok />
          </IconButton>
          <IconButton color={'facebook'}>
            <FaFacebookMessenger sx={{ fontSize: 2 }} />
          </IconButton>
          <IconButton color={'primary'}>
            <FaViber />
          </IconButton>
          <IconButton size={'large'} >
            <PhoneIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;
