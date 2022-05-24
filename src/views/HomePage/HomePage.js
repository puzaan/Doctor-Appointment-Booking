import React, { useState, useEffect } from 'react';

import { Topbar, Logo, Footer, SearchBar, TabBtn } from './components';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const HomePage = () => {
  const [allDoctorList, setAllDoctorLis] = useState([]);

  useEffect(() => {
    const getAllDoctorList = async () => {
      await fetch(
        'https://doctorappointment123.herokuapp.com/api/v1/public/doctor/view/all',
      )
        .then((Response) => Response.json())
        .then((receivedData) => setAllDoctorLis(receivedData.data));
    };
    getAllDoctorList();
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Topbar />
      </Box>
      <Box>
        <Logo />
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        marginTop={4}
        marginBottom={4}
      >
        <SearchBar data={allDoctorList} />
      </Box>
      <Box>
        <TabBtn />
      </Box>
      <Box bgcolor={'#F2F2F2'} marginTop={4}>
        <Box
          maxWidth={{ sm: 720, md: 1236 }}
          width={1}
          margin={'0 auto'}
          paddingX={2}
          paddingTop={2}
        >
          <Footer />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default HomePage;
