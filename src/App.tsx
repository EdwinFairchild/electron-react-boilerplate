import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { useSidebarStore } from './store/sidebarStore';

function App() {
  const [isDark, setIsDark] = useState(false); // Manage dark mode state
  const { isLeftOpen, isRightOpen } = useSidebarStore();

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

  const toggleTheme = () => setIsDark((prev) => !prev); // Theme toggle handler

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(50, 50, 50, 0.8))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(238, 238, 255, 0.8))',
          color: 'text.primary',
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: isLeftOpen ? 256 : 64, // Adjust width dynamically
            flexShrink: 0,
            transition: 'width 0.3s',
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
          {/* Dashboard Section */}
          <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            Dashboard
          </Typography>

          {/* Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 2,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box
                key={item}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: isDark
                    ? 'rgba(40, 40, 40, 0.3)'
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isDark
                    ? '0 4px 8px rgba(0, 0, 0, 0.4)'
                    : '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)', // Frosted-glass effect
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? '0 8px 16px rgba(0, 0, 0, 0.6)'
                      : '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
                  Card {item}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  This is a sample card with some content. You can replace this with actual data.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: isRightOpen ? 256 : 0, // Adjust width dynamically
            flexShrink: 0,
            transition: 'width 0.3s',
          }}
        >
          <RightSidebar isDark={isDark} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
