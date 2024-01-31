import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmRegistration, resendCode } from '../services/authenticate';

function ConfirmRegistration() {
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [code, setCode] = useState('');
  const [isResendCode, setIsResendCode] = useState(false);
  const [codeErr, setCodeErr] = useState('');
  const [codeValidationErr, setCodeValidationErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === 'email') {
      setEmail(value);
    }

    if (formField === 'code') {
      setCode(value);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const validation = () => new Promise((resolve, reject) => {
    if (email === '') {
      setEmailErr('Email is Required');
      resolve({ email: 'Email is Required', code: '' });
    } else if (code === '' && !isResendCode) {
      setCodeErr('Code is Required');
      resolve({ code: 'Code is Required' });
    } else {
      resolve({ code: '' });
    }
  });

  const handleClick = () => {
    setEmailErr('');
    setCodeErr('');
    setIsResendCode(false);
    validation()
      .then((res) => {
        if (res.code === '') {
          confirmRegistration(email, code).then(() => {
            setCodeErr('');
            Navigate('/login');
          }, (err) => {
            setCodeValidationErr(err.message);
          })
            .catch((err) => console.log(err));
        }
      }, (err) => console.log(err))
      .catch((err) => console.log(err));
  };

  const handleClickResendCode = () => {
    setEmailErr('');
    setCodeErr('');
    setIsResendCode(true);
    validation()
      .then((res) => {
        if (res.code === '') {
          resendCode(email).then(() => {
            setCodeErr('');
          }, (err) => {
            setCodeValidationErr(err.message);
          })
            .catch((err) => console.log(err));
        }
      }, (err) => console.log(err))
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">

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
          <TextField
            value={code}
            onChange={(e) => formInputChange('code', e.target.value)}
            label="Code"
            helperText={codeErr}
            fullWidth
          />
        </div>
        <div className="formfield">
          <Button type="submit" variant="contained" onClick={handleClick}>Confirm</Button>
        </div>
        <div className="formfield">
          <Button type="button" variant="contained" onClick={handleClickResendCode}>Resend Code</Button>
        </div>
        <Typography variant="body">{codeValidationErr}</Typography>
      </div>

    </div>
  );
}

export default ConfirmRegistration;
