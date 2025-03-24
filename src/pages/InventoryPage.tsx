
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Inventory from '../components/Inventory';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import { EditableField } from '../components/ui/editable-field';

const InventoryPage = () => {
  const [pageTitle, setPageTitle] = useState('Gestion des Stocks');
  const [pageDescription, setPageDescription] = useState('Gérez votre inventaire et suivez les niveaux de stock de vos cultures guadeloupéennes');

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
                  onSave={(value) => setPageTitle(value.toString())}
                  className="inline-block"
                />
              </h1>
              <p className="text-muted-foreground">
                <EditableField
                  value={pageDescription}
                  onSave={(value) => setPageDescription(value.toString())}
                  className="inline-block"
                />
              </p>
            </div>
          </header>
          
          <GuadeloupeSpecificCrops />
          <Inventory />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default InventoryPage;
