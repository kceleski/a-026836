
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Inventory from '../components/Inventory';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import { EditableField } from '../components/ui/editable-field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const InventoryPage = () => {
  const [pageTitle, setPageTitle] = useState('Gestion des Stocks et Récoltes');
  const [pageDescription, setPageDescription] = useState('Gérez votre inventaire et suivez les niveaux de stock de vos cultures guadeloupéennes');

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

          <Tabs defaultValue="inventory" className="mb-6">
            <TabsList className="w-full md:w-auto grid grid-cols-3 gap-2">
              <TabsTrigger value="inventory">Inventaire</TabsTrigger>
              <TabsTrigger value="crops">Cultures</TabsTrigger>
              <TabsTrigger value="weather">Météo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory" className="mt-6">
              <Inventory />
            </TabsContent>
            
            <TabsContent value="crops" className="mt-6">
              <GuadeloupeSpecificCrops />
              <GuadeloupeHarvestTracking />
            </TabsContent>
            
            <TabsContent value="weather" className="mt-6">
              <GuadeloupeWeatherAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default InventoryPage;
