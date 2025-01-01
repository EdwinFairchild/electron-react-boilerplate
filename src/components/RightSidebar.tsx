import React from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { Bell, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';

export const RightSidebar: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { isRightOpen, toggleRight } = useSidebarStore();

  const notifications = [
    { title: 'New Message', time: '5m ago', icon: <MessageSquare size={16} /> },
    { title: 'Meeting', time: '1h ago', icon: <Calendar size={16} /> },
    { title: 'Update Available', time: '2h ago', icon: <Bell size={16} /> },
  ];

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleRight}
        sx={{
          position: 'fixed',
          top: 16,
          right: isRightOpen ? 256 : 0, // Align with sidebar
          transition: 'right 0.3s',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <ChevronRight
          sx={{
            transform: isRightOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }}
        />
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 256,
          height: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderLeft: 1,
          borderColor: 'divider',
          transform: isRightOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>

        {/* Notification List */}
        <Box sx={{ mt: 2 }}>
          {notifications.map((notification, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {notification.icon}
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1">{notification.title}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {notification.time}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};
