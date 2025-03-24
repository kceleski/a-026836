
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import CropPlanning from '../components/CropPlanning';

const CropsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <CropPlanning />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default CropsPage;
