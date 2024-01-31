/* eslint-disable prefer-promise-reject-errors */
import { Button, TextField } from '@mui/material';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userPool from '../userPool';

function Signup() {
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === 'email') {
      setEmail(value);
    }
    if (formField === 'password') {
      setPassword(value);
    }
  };

  const validation = () => new Promise((resolve, reject) => {
    if (email === '' && password === '') {
      setEmailErr('Email is Required');
      setPasswordErr('Password is required');
      resolve({ email: 'Email is Required', password: 'Password is required' });
    } else if (email === '') {
      setEmailErr('Email is Required');
      resolve({ email: 'Email is Required', password: '' });
    } else if (password === '') {
      setPasswordErr('Password is required');
      resolve({ email: '', password: 'Password is required' });
    } else if (password.length < 6) {
      setPasswordErr('must be 6 character');
      resolve({ email: '', password: 'must be 6 character' });
    } else {
      resolve({ email: '', password: '' });
    }
    reject('');
  });

  const handleClick = () => {
    setEmailErr('');
    setPasswordErr('');
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          const attributeList = [];
          attributeList.push(
            new CognitoUserAttribute({
              Name: 'email',
              Value: email,
            }),
          );
          const username = email;
          userPool.signUp(username, password, attributeList, null, (err, data) => {
            if (err) {
              console.log(err);
              alert("Couldn't sign up");
            } else {
              console.log(data);
              alert('User Added Successfully');
              Navigate('/login');
            }
          });
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
            value={password}
            onChange={(e) => { formInputChange('password', e.target.value); }}
            type="password"
            label="Password"
            helperText={passwordErr}
            fullWidth
          />
        </div>
        <div className="formfield">
          <Button type="submit" variant="contained" onClick={handleClick}>Signup</Button>
        </div>
      </div>

    </div>
  );
}

export default Signup;
