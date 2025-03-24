
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Statistics from '../components/Statistics';

const StatsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Statistics />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default StatsPage;
