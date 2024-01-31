import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userPool from '../userPool';
import { logout } from '../services/authenticate';

function Dashboard() {
  const Navigate = useNavigate();

  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (!user) {
      Navigate('/login');
    }
  }, []);

  const handleLogOut = () => {
    logout();
    Navigate('/login');
  };

  return (
    <div className="Dashboard">
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
