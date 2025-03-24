
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Inventory from '../components/Inventory';

const InventoryPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Inventory />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default InventoryPage;
