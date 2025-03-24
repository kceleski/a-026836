
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import ParcelManagement from '../components/ParcelManagement';

const ParcelsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <ParcelManagement />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default ParcelsPage;
