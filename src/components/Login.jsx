import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';

function Login() {
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === 'email') {
      setEmail(value);
    }
  };

  const validation = () => new Promise((resolve, reject) => {
    if (email === '') {
      setEmailErr('Email is Required');
      resolve({ email: 'Email is Required' });
    } else {
      resolve({ email: '' });
    }

    reject();
  });

  const handleClick = () => {
    setEmailErr('');
    validation()
      .then((res) => {
        if (res.email === '') {
          authenticate(email)
            .then(() => {
              setLoginErr('');
              Navigate('/dashboard');
            }, (err) => {
              console.log(err);
              setLoginErr(err.message);
            })
            .catch((err) => console.log(err));
        }
      }, (err) => console.log(err))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">

      <div className="form">
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange('email', e.target.value)}
            label="Email"
            helperText={emailErr}
            fullWidth
          />
        </div>
        <div className="formfield">
          <Button type="submit" variant="contained" onClick={handleClick}>Login</Button>
        </div>
        <Typography variant="body">{loginErr}</Typography>
      </div>

    </div>
  );
}

export default Login;
