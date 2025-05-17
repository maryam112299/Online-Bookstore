import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/login';
import Home from './components/home/Home';
import { Dashboard } from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';

import './App.css';

function App() {
  const location = useLocation();

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.5
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Home />
            </motion.div>
          } />
          <Route path="/signup" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Signup />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Login />
            </motion.div>
          } />
          <Route path="/dashboard" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Dashboard />
            </motion.div>
          } />
          <Route path="/profile" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Profile />
            </motion.div>
          } />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;