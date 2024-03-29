import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Form from '../Form';
import Download from '../Download';
import { Box } from '@mui/material';
import Container from 'components/Container';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  /* background-color: transparent; */
//   width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  /* border: none; */
//   border-radius: 5px;
  display: flex;
  justify-content: center;
  background-color: ${'#5A227E'};

  &:hover {
    border-color: black;
  }

  /* &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[500]};
    outline-offset: 2px;
  } */

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: black;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  /* background-color: ${blue[500]}; */
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const TabBtn = () => {
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
    console.log(allDoctorList);
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TabsUnstyled>
        <TabsList>
          <Tab>Online Clinic</Tab>
          <Tab>Buzzer</Tab>
          <Tab>Doctalk</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Box display={'flex'} justifyContent={'center'}>
            <Container maxWidth={900} paddingBottom={'0 !important'}>
              <Form data={allDoctorList} />
            </Container>
          </Box>
        </TabPanel>
        <TabPanel value={1}>
          <Box display={'flex'} justifyContent={'center'}>
            <Container maxWidth={900} paddingBottom={'0 !important'}>
              Soon...
            </Container>
          </Box>
        </TabPanel>
        <TabPanel value={2}>
          <Box display={'flex'} justifyContent={'center'}>
            <Container maxWidth={900} paddingBottom={'0 !important'}>
              <Download />
            </Container>
          </Box>
        </TabPanel>
      </TabsUnstyled>
    </LocalizationProvider>
  );
};

export default TabBtn;
