
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';

const CropsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <GuadeloupeHarvestTracking />
          <GuadeloupeSpecificCrops />
          <CropPlanning />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default CropsPage;
