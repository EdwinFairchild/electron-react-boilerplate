import React from 'react';
import { Typography } from '@mui/material';

interface DocumentsPageProps {
  isDark: boolean;
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ isDark }) => {
  return (
    <Typography variant="h4" sx={{ mt: 4 }}>
      Documents Page
    </Typography>
    // Add your Documents page content here
  );
};

export default DocumentsPage;
