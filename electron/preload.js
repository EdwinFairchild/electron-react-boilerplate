const { contextBridge , ipcRenderer} = require('electron');

// Expose any APIs to renderer here
contextBridge.exposeInMainWorld('api', {
  // Add any required APIs here
  getTheme: () => {
 //   console.log('window.api.getTheme called'); // Ensure this gets logged
    return ipcRenderer.invoke('get-theme');
  },
  saveTheme: (theme) => {
 //   console.log(`window.api.saveTheme called with theme: ${theme}`); // Ensure this gets logged
    return ipcRenderer.invoke('save-theme', theme);
  },
  
});