import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const SearchBar = (props) => {
  const { data } = props;
  const [wordEntered, setWordEntered] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const excludeColums = [
    '_id',
    'fee',
    'password',
    'token',
    'dob',
    'gender',
    'address',
    'contactNumber',
    'emailId',
    'role',
    'educationBackground',
    'NMC_number',
    'affiliated_hospital',
    'created_by_admin',
    'profilePhotoLink',
    'coverPhotoLink',
    'videoList',
    'available_dates',
    'doctorId',
  ];

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return value.fullName.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === '') {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };

  const handleFilter = (value) => {
    setWordEntered(value);

    filterData(value);
  };

  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (lowerCaseValue === '') {
      setFilteredData([]);
    } else {
      const filterData = data.filter((item) => {
        return Object.keys(item).some((key) => {
          return excludeColums.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowerCaseValue);
        });
      });
      setFilteredData(filterData);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box
        component={TextField}
        placeholder="Search by doctor name, disease, specialist "
        variant="outlined"
        color="primary"
        fullWidth
        height={1}
        value={wordEntered}
        onChange={(e) => handleFilter(e.target.value)}
        width={{md: 450}}
        
        sx={{
          // maxWidth: 415,
          '& .MuiOutlinedInput-root': { borderRadius: 10 },
        }}
      ></Box>
      <Box display={'flex'}>
        {filteredData.length != 0 && (
          <Box sx={{
            marginTop:1,
            background: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            padding: 1
          }}>
            {filteredData.slice(0, 15).map((value, i) => {
              return (
                <Box
                  key={i}
                  // width={'100%'}
                  // height={'50px'}
                  display={'flex'}
                  flexDirection={'row'}
                  // alignItems={'center'}
                  paddingLeft={1}
                  component={Link}
                  to="/"
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  <Avatar src={value.profilePhotoLink} />
                  <Box paddingLeft={'10px'}>
                    <Typography fontWeight={500}>{value.fullName}</Typography>
                    <Box display={'flex'}>
                      {value.tag.slice(0,3).map((item, i) => {
                        return (
                          <Box key={i} paddingLeft={'5px'}>

                            <Typography variant="subtitle1">
                              {'#' + item + ' '} 
                            </Typography>
                            
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* <div className="search">
        <Box maxWidth={600} margin={'0 auto'}>
          <Box
            component={'form'}
            noValidate
            autoComplete="off"
            sx={{
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                bgcolor: 'background.paper',
              },
            }}
          ></Box>
        </Box>

        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search by doctor name, disease, specialist "
            value={wordEntered}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, i) => {
              return (
                <Box
                  key={i}
                  width={'100%'}
                  height={'50px'}
                  display={'flex'}
                  alignItems={'center'}
                  paddingLeft={1}
                  component={Link}
                  to="/"
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  <Avatar src={value.profilePhotoLink} />
                  <Box paddingLeft={'10px'}>
                    <Typography fontWeight={500}>{value.fullName}</Typography>
                    <Box display={'flex'}>
                      {value.tag.map((item, i) => {
                        return (
                          <Box key={i} paddingLeft={'5px'}>
                            <Typography variant="subtitle1">
                              {'#' + item + ' '}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </div>
        )}
      </div> */}
    </Box>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
};
