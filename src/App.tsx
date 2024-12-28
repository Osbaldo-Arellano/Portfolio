// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';      // the IDE layout inside
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* "/" goes to Home (the IDE) */}
        <Route index element={<Home />} />

        {/* "/contact" => Contact page */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
