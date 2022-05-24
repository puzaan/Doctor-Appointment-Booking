import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Button from '@mui/material/Button';

const mock = [
  {
    name: 'Dr. Chary Smith',
    title: 'Urologist And Andrologist',
    avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
  {
    name: 'Dr. Clara Bertoletti',
    title:
      'Internal Medicine, Gastroenterology',
    avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
  {
    name: 'Dr. Jhon Anderson',
    title: 'Consultant Physician & Nephrologist',
    avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
  {
    name: 'Dr. Chary Smith',
    title: 'Gynaecologist and fertility specialist',
    avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
  {
    name: 'Dr. Chary Smith',
    title: 'Consultant Physician & Nephrologist',
    avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  },
];

const Doctor = () => {
  const theme = useTheme();
  const [noOfElement, setNoOfElement] = useState(4);
  const loadMore = ()=>{
    setNoOfElement(noOfElement + noOfElement);
  };

  const slice = mock.slice(0, noOfElement);
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={'h4'}>
          Consult with doctors
        </Typography>
        <Typography>Talk to a doctor regarding your health issue.</Typography>
      </Box>
      <Grid container spacing={2}>
        {slice.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              component={Card}
              boxShadow={1}
              // height={310}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <CardContent>
                <Box
                  component={Avatar}
                  src={item.avatar}
                  height={80}
                  width={80}
                />
                <Box marginTop={4}>
                  <ListItemText primary={item.name} secondary={item.title} />
                  {/* <Typography variant={'subtitle2'} color={'text.secondary'}>
                    {item.about}
                  </Typography> */}
                  <Box
                    marginTop={4}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box>
                      <IconButton size={'small'} color={'primary'}>
                        <FacebookIcon />
                      </IconButton>
                      <IconButton size={'small'} color={'primary'}>
                        <TwitterIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <Button
                        variant={'contained'}
                        startIcon={
                          <Box
                            component={'svg'}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            width={15}
                            height={15}
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                          </Box>
                        }
                      >
                        Book Appointment
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box marginTop={2} display={'flex'} justifyContent={'center'}>
        <Button
          variant={'outlined'}
          onClick={() => loadMore()}
          disabled={noOfElement >= mock.length ? true : false}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export default Doctor;
