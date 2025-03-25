
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeRainfallTracking from '../components/GuadeloupeRainfallTracking';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { EditableField } from '../components/ui/editable-field';
import { useState } from 'react';

const CropsPage = () => {
  const [pageTitle, setPageTitle] = useState('Gestion des Cultures Guadeloupéennes');
  const [pageDescription, setPageDescription] = useState('Surveillez, planifiez et optimisez toutes vos cultures adaptées au climat tropical');

  // Handlers avec correction de typage
  const handleTitleChange = (value: string | number) => {
    setPageTitle(String(value));
  };

  const handleDescriptionChange = (value: string | number) => {
    setPageDescription(String(value));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 animate-enter">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                <EditableField
                  value={pageTitle}
                  onSave={handleTitleChange}
                  className="inline-block"
                />
              </h1>
              <p className="text-muted-foreground">
                <EditableField
                  value={pageDescription}
                  onSave={handleDescriptionChange}
                  className="inline-block"
                />
              </p>
            </div>
          </header>

          <Tabs defaultValue="crops" className="mb-6">
            <TabsList className="w-full md:w-auto grid grid-cols-3 gap-2">
              <TabsTrigger value="crops">Cultures</TabsTrigger>
              <TabsTrigger value="harvest">Récoltes</TabsTrigger>
              <TabsTrigger value="rainfall">Précipitations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="crops" className="mt-6 space-y-6">
              <GuadeloupeSpecificCrops />
              <CropPlanning />
            </TabsContent>
            
            <TabsContent value="harvest" className="mt-6">
              <GuadeloupeHarvestTracking />
            </TabsContent>
            
            <TabsContent value="rainfall" className="mt-6">
              <GuadeloupeRainfallTracking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default CropsPage;
