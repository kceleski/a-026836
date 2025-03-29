
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ParcelManagement from '../components/ParcelManagement';
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';
import { Button } from '@/components/ui/button';
import { Download, Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ParcelsPage = () => {
  const { toast } = useToast();
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Parcelles',
    defaultDescription: 'Gérez, organisez et optimisez toutes vos parcelles agricoles'
  });

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "L'export de toutes les données des parcelles a démarré"
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import de données",
      description: "Veuillez sélectionner un fichier à importer"
    });
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <PageHeader 
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
          </div>
        </div>

        <ParcelManagement />
      </div>
    </PageLayout>
  );
};

export default ParcelsPage;
