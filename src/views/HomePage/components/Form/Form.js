/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Form.css';
import axios from 'axios';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your Full name'),
  address: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid address')
    .max(50, 'Please enter a valid address'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address'),
  contact: yup
    .string()
    .trim()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/,
      'Please enter a valid contact number.',
    )
    .required('Please enter your phone'),
  sex: yup.string().required('Please specify your gender'),
  timeslot: yup.string().required('Please select a time'),
  doctorId: yup.string().required('Please select a doctor'),
  age: yup
    .date()
    .required('Please select a date and time')
    .nullable(),
  message: yup
    .string()
    .trim()
    .max(500, 'The message cannot contain more than 500 characters'),
});

const Form = (props) => {
  const { data } = props;

  const [fulldate, setFulldate] = useState('');
  const [timeList, setTimeList] = useState([]);
  const [fulltime, setFullTime] = useState('');

  const [open, setOpen] = useState(false);

  const initialValues = {
    firstName: '',
    age: new Date().toLocaleDateString(),
    address: '',
    email: '',
    contact: '',
    sex: '',
    message: '',
    doctorId: '',
    date: null,
    timeslot: '',
    calDate: '',
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const onSubmit = async (values) => {
    const response = await axios
      .post(
        'https://doctorappointment123.herokuapp.com/api/v1/booking/create',
        {
          firstName: values.firstName,
          age: values.age,
          contact: values.contact,
          email: values.email,
          address: values.address,
          doctorId: values.doctorId,
          date: fulldate,
          timeslot: fulltime,
          message: values.message,
        },
      )
      .catch((err) => {
        if (err && err.response.message) {
          console.log('Error: ' + err.message);
          alert(err.message);
        }
      });

    if (response && response.data) {
      setOpen(true);
      console.log(response.data);
    }
  };
  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFulldate(new Date(formik.values.date).toLocaleDateString('en-US'));
  }, [formik.values.date]);

  useEffect(() => {
    setFullTime(
      new Intl.DateTimeFormat('en-US', options).format(formik.values.timeslot),
    );
  }, [formik.values.timeslot]);

  useEffect(() => {
    const getTimelist = async () => {
      await fetch(
        `https://doctorappointment123.herokuapp.com/api/v1/public/doctor/view/timestamp/${formik.values.doctorId}?date=${fulldate}`,
      )
        .then((Response) => Response.json())
        .then((receivedData) => setTimeList(receivedData.data));
    };
    getTimelist();
  }, [formik.values.doctorId, fulldate]);

  return (
    <Box>
      <Typography variant={'h3'} sx={{ marginBottom: 2 }} align={'center'}>
        Online consultation form
      </Typography>
      <Box
        component={Card}
        variant={'outlined'}
        padding={2}
        bgcolor={'transparent'}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            component={Grid}
            marginBottom={{ xs: 10, sm: 0 }}
            container
            spacing={4}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Please tell us your Full Name
              </Typography>
              <TextField
                label="First name"
                variant="outlined"
                name={'firstName'}
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Select Gender
              </Typography>
              <TextField
                select
                label="Select gender"
                variant="outlined"
                name={'sex'}
                fullWidth
                value={formik.values.sex}
                onChange={formik.handleChange}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
                helperText={formik.touched.sex && formik.errors.sex}
              >
                {['Male', 'Female', 'Other'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Select DOB
              </Typography>
              <MobileDatePicker
                disableFuture
                label="Select DOB"
                value={formik.values.age}
                onChange={(newValue) => {
                  formik.setFieldValue('age', newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Please enter your contact number
              </Typography>
              <TextField
                label="contact number"
                variant="outlined"
                name={'contact'}
                fullWidth
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Please tell us your address (optional)
              </Typography>
              <TextField
                label="Address"
                variant="outlined"
                name={'address'}
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Please enter your email address (optional)
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                name={'email'}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Select Doctor
              </Typography>
              <TextField
                select
                label="Select doctor"
                variant="outlined"
                name={'doctorId'}
                fullWidth
                value={formik.values.doctorId}
                onChange={formik.handleChange}
                error={
                  formik.touched.doctorId && Boolean(formik.errors.doctorId)
                }
                helperText={formik.touched.doctorId && formik.errors.doctorId}
              >
                {data.map((option) => (
                  <MenuItem key={option.doctorId} value={option.doctorId}>
                    {option.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Select Date
              </Typography>
              <MobileDatePicker
                disabled={formik.values.doctorId == '' ? true : false}
                disablePast
                label="Select Date"
                value={formik.values.date}
                onChange={(newValue) => {
                  formik.setFieldValue('date', newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            {timeList.length == 0 ? (
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Avilable Time
                </Typography>
                <TextField
                  disabled={formik.values.date == null ? true : false}
                  select
                  label="Time"
                  variant="outlined"
                  name={'timeslot'}
                  fullWidth
                  value={formik.values.timeslot}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.timeslot && Boolean(formik.errors.timeslot)
                  }
                  helperText={formik.touched.timeslot && formik.errors.timeslot}
                  // className="time_tab"
                >
                  <MenuItem>
                    no time schedule is avilable for selected date
                    <br />
                    Please select another date
                  </MenuItem>
                </TextField>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Avilable Time
                </Typography>
                <TextField
                  disabled={formik.values.date == null ? true : false}
                  select
                  label="Time"
                  variant="outlined"
                  name={'timeslot'}
                  fullWidth
                  value={formik.values.timeslot}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.timeslot && Boolean(formik.errors.timeslot)
                  }
                  helperText={formik.touched.timeslot && formik.errors.timeslot}
                  className="time_tab"
                >
                  {timeList.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {/* {new Date(option * 1000).toLocaleTimeString('en-US')} */}
                      {new Date(option * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Message
              </Typography>
              <TextField
                label="Message"
                variant="outlined"
                name={'message'}
                fullWidth
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Book Appointment
              </Button>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Your Appointment is booked'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    We will inform you for more detail
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Box component="a" href="/">
                    <Button onClick={handleClose} autoFocus>
                      Ok
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
              <Typography
                variant={'subtitle2'}
                color={'textSecondary'}
                sx={{ marginTop: 2 }}
                align={'center'}
              >
                After confirming we will soon notice you.
              </Typography>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Form;

Form.propTypes = {
  data: PropTypes.array.isRequired,
};
