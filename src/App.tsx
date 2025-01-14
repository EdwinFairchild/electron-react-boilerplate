import React, { useState, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
} from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { useSidebarStore } from './store/sidebarStore';

// Import your page components
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isDark, setIsDark] = useState(false); // Manage dark mode state
  const { isLeftOpen, isRightOpen, selectedPage } = useSidebarStore();

  // Load theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await window.api.getTheme();
      setIsDark(savedTheme === 'dark');
    };
    loadTheme();
  }, []);

  // Create the Material-UI theme dynamically based on `isDark`
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#4A90E2',
      },
      secondary: {
        main: '#50E3C2',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h3: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    window.api.saveTheme(newTheme); // Save the new theme
  };

  // Function to render the selected page
  const renderPage = () => {
    switch (selectedPage) {
      case 'Home':
        return <HomePage isDark={isDark} />;
      case 'Users':
        return <UsersPage isDark={isDark} />;
      case 'Documents':
        return <DocumentsPage isDark={isDark} />;
      case 'Settings':
        return <SettingsPage isDark={isDark} />;
      default:
        return <HomePage isDark={isDark} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, rgba(19, 19, 19, 0.6), rgba(51, 51, 51, 0.6))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(238, 238, 255, 0.6))',
          color: 'text.primary',
          transition: 'filter 0.3s',
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: isLeftOpen ? 256 : 64, // Adjust width dynamically
            flexShrink: 0,
            transition: 'width 0.3s',
            background: isDark
              ? 'rgba(40, 40, 40, 0.3)'
              : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)', // Frosted-glass effect
            borderRight: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}
        >
          <Sidebar toggleTheme={toggleTheme} isDark={isDark} />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Take up remaining space
            height: '100vh',
            overflow: 'auto',
            transition: 'padding-right 0.3s',
            paddingRight: isRightOpen ? 256 : 0, // Adjust padding based on right sidebar
            p: 3,
          }}
        >
          {renderPage()}
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: isRightOpen ? 256 : 0, // Adjust width dynamically
            flexShrink: 0,
            transition: 'width 0.3s',
            background: isDark
              ? 'rgba(40, 40, 40, 0.3)'
              : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)', // Frosted-glass effect
            borderLeft: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}
        >
          <RightSidebar isDark={isDark} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
