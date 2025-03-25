
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import GuadeloupeParcelManagement from '../components/GuadeloupeParcelManagement';
import { useState } from 'react';
import { EditableField } from '../components/ui/editable-field';

const ParcelsDetailsPage = () => {
  const [pageTitle, setPageTitle] = useState('Gestion des Parcelles en Guadeloupe');
  const [pageDescription, setPageDescription] = useState('Gérez, surveillez et optimisez vos parcelles agricoles à travers tout l\'archipel');

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
          <header className="mb-6">
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
          </header>

          <GuadeloupeParcelManagement />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default ParcelsDetailsPage;
