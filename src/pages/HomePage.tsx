import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';

interface HomePageProps {
  isDark: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isDark }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (card: number) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
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

      {/* Modal */}
      <Modal
        open={selectedCard !== null}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backdropFilter: 'blur(5px)' }, // Blur effect for the backdrop
        }}
      >
        <Fade in={selectedCard !== null}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              p: 4,
              backgroundColor: isDark
                ? 'rgba(80, 80, 80, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              boxShadow: 24,
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
    </>
  );
};

export default HomePage;
