import React from 'react';
import { Typography } from '@mui/material';

interface UsersPageProps {
  isDark: boolean;
}

const UsersPage: React.FC<UsersPageProps> = ({ isDark }) => {
  return (
    <Typography variant="h4" sx={{ mt: 4 }}>
      Users Page
    </Typography>
    // Add your Users page content here
  );
};

export default UsersPage;
