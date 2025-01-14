import React from 'react';
import { Typography } from '@mui/material';

interface SettingsPageProps {
  isDark: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isDark }) => {
  return (
    <Typography variant="h4" sx={{ mt: 4 }}>
      Settings Page
    </Typography>
    // Add your Settings page content here
  );
};

export default SettingsPage;
