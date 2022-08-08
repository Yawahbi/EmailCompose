import { useState } from 'react';
// theme
import ThemeProvider from './theme';
import Profile from './pages/Profile'


function App() {

  return (
    <ThemeProvider>
      <Profile />
    </ThemeProvider>
  );
}

export default App;
