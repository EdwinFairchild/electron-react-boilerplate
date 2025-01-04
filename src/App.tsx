import React, { useState , useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { useSidebarStore } from './store/sidebarStore';

function App() {
  const [isDark, setIsDark] = useState(false); // Manage dark mode state
  const { isLeftOpen, isRightOpen } = useSidebarStore();
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card


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
    console.log('toggleTheme called'); // Log when the function is triggered
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    window.api.saveTheme(newTheme); // Save the new theme
  };
  const handleCardClick = (card) => {
    setSelectedCard(card); // Set the clicked card as selected
  };

  const handleCloseModal = () => {
    setSelectedCard(null); // Close the modal
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
          filter: selectedCard ? 'blur(15px)' : 'none', // Blur the background when modal is open
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
                    ? 'rgba(40, 40, 40, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: isDark
                    ? '0 4px 8px rgba(0, 0, 0, 0.4)'
                    : '0 4px 8px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(15px)', // Enhanced frosted-glass effect
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? '0 8px 16px rgba(0, 0, 0, 0.6)'
                      : '0 8px 16px rgba(0, 0, 0, 0.3)',
                  },
                }}
                onClick={() => handleCardClick(item)}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
                  Card {item}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  This is a sample card with some content. Click to view more.
                </Typography>
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

      {/* Modal */}
      <Modal
        open={!!selectedCard}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backdropFilter: 'blur(5px)' }, // Blur effect for the backdrop
        }}
      >
        <Fade in={!!selectedCard}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              p: 12,
              backgroundColor: isDark
                ? 'rgba(80, 80, 80, 0.2)'
                : 'rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              boxShadow: 5,
              minWidth: 300,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Card {selectedCard}
            </Typography>
            <Typography variant="body1">
              This is detailed information about Card {selectedCard}. You can replace this content
              with dynamic data.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default App;
