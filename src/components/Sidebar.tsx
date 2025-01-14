import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Menu, Home, Settings, Users, FileText, Moon, Sun } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';

export const Sidebar: React.FC<{ toggleTheme: () => void; isDark: boolean }> = ({ toggleTheme, isDark }) => {
  const { isLeftOpen, toggleLeft, selectedPage, setSelectedPage } = useSidebarStore();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <Users size={20} />, label: 'Users' },
    { icon: <FileText size={20} />, label: 'Documents' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isLeftOpen ? 256 : 64,
        bgcolor: 'background.default',
        borderRight: 1,
        borderColor: 'divider',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toggle Button */}
      <Box sx={{ p: 2 }}>
        <IconButton onClick={toggleLeft} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
          <Menu size={20} />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box component="nav" sx={{ mt: 2 }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            startIcon={item.icon}
            onClick={() => setSelectedPage(item.label as any)} // Update selected page
            sx={{
              justifyContent: isLeftOpen ? 'flex-start' : 'center',
              textTransform: 'none',
              p: 2,
              width: '100%',
              color: selectedPage === item.label ? 'primary.main' : 'text.primary',
              backgroundColor: selectedPage === item.label ? 'action.selected' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {isLeftOpen && <Typography>{item.label}</Typography>}
          </Button>
        ))}
      </Box>

      {/* Theme Toggle */}
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          display: 'flex',
          justifyContent: isLeftOpen ? 'flex-start' : 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={toggleTheme}
          sx={{
            width: isLeftOpen ? '100%' : '40px', // Adjust width dynamically
            height: '40px',
            justifyContent: isLeftOpen ? 'flex-start' : 'center',
            textTransform: 'none',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: isLeftOpen ? '4px' : '50%', // Make it circular when closed
          }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          {isLeftOpen && (
            <Typography sx={{ ml: 1 }}>{isDark ? 'Light Mode' : 'Dark Mode'}</Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
};
