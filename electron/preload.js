const { contextBridge } = require('electron');

// Expose any APIs to renderer here
contextBridge.exposeInMainWorld('electron', {
  // Add any required APIs here
});