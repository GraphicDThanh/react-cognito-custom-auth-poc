/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../userPool';

export const authenticate = (email) => new Promise((resolve, reject) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  const authDetails = new AuthenticationDetails({
    Email: email,
    Password: 'abcABC@123',
  });

  cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');
  cognitoUser.initiateAuth(authDetails, {
    onSuccess: (result) => {
      console.log('login successful', result);
      resolve(result);
    },
    onFailure: (err) => {
      console.log('login failed', err);
      reject(err);
    },
    customChallenge(challengeParameters) {
      // User authentication depends on challenge response
      const challengeResponses = prompt('Enter code:');
      cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
    },
  });
});

export const logout = () => {
  const user = userPool.getCurrentUser();
  user.signOut();
  console.log('Log out.');
};

// export const confirmRegistration = (email, code) => new Promise((resolve, reject) => {
//   const cognitoUser = new CognitoUser({
//     Username: email,
//     Pool: userPool,
//   });
//   cognitoUser.confirmRegistration(code, true, (err, result) => {
//     if (err) {
//       reject(err);
//     }
//     resolve(result);
//   });
// });

// export const resendCode = (email) => {
//   console.log('email', email);
//   return new Promise((resolve, reject) => {
//     const cognitoUser = new CognitoUser({
//       Username: email,
//       Pool: userPool,
//     });
//     cognitoUser.resendConfirmationCode((err, result) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// };
