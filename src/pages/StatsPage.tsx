
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Statistics from '../components/Statistics';
import { ChartConfig } from '../components/ui/chart-config';
import { EditableTable, Column } from '../components/ui/editable-table';
import { EditableField } from '../components/ui/editable-field';

interface PerformanceData {
  name: string;
  current: number;
  target: number;
  unit: string;
}

const StatsPage = () => {
  const [pageTitle, setPageTitle] = useState('Statistiques et Analyses');
  const [pageDescription, setPageDescription] = useState('Visualisez et analysez les données de votre exploitation en Guadeloupe');
  
  // Exemple de données adaptées à l'agriculture guadeloupéenne
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([
    { name: 'Rendement Canne à Sucre', current: 75, target: 85, unit: 't/ha' },
    { name: 'Qualité Banane Export', current: 88, target: 95, unit: '%' },
    { name: 'Rentabilité Ananas', current: 70, target: 80, unit: '%' },
    { name: 'Certification Bio', current: 25, target: 40, unit: '%' },
    { name: 'Innovation Igname', current: 60, target: 75, unit: '%' },
  ]);
  
  // Colonnes du tableau éditable
  const columns: Column[] = [
    { id: 'name', header: 'Indicateur', accessorKey: 'name', isEditable: true },
    { id: 'current', header: 'Valeur actuelle', accessorKey: 'current', type: 'number', isEditable: true },
    { id: 'target', header: 'Objectif', accessorKey: 'target', type: 'number', isEditable: true },
    { id: 'unit', header: 'Unité', accessorKey: 'unit', isEditable: true },
  ];
  
  // Gestionnaire de mise à jour du tableau - correction du typage
  const handleTableUpdate = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...performanceData];
    const updatedRow = { ...newData[rowIndex] } as PerformanceData;
    
    // Typages corrects et explicites pour chaque propriété
    if (columnId === 'current' || columnId === 'target') {
      updatedRow[columnId as 'current' | 'target'] = Number(value);
    } else if (columnId === 'name' || columnId === 'unit') {
      updatedRow[columnId as 'name' | 'unit'] = String(value);
    }
    
    newData[rowIndex] = updatedRow;
    setPerformanceData(newData);
  };
  
  // Gestionnaire de suppression de ligne
  const handleDeleteRow = (rowIndex: number) => {
    const newData = [...performanceData];
    newData.splice(rowIndex, 1);
    setPerformanceData(newData);
  };
  
  // Gestionnaire d'ajout de ligne
  const handleAddRow = (newRow: Record<string, any>) => {
    const typedRow: PerformanceData = {
      name: String(newRow.name || ''),
      current: Number(newRow.current || 0),
      target: Number(newRow.target || 0),
      unit: String(newRow.unit || '%'),
    };
    setPerformanceData([...performanceData, typedRow]);
  };

  // Handlers de titre avec correction de typage
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
          
          <div className="mb-8">
            <ChartConfig 
              title="Indicateurs de performance agricole en Guadeloupe"
              description="Suivez vos performances par rapport à vos objectifs pour les cultures guadeloupéennes"
              onTitleChange={(title) => console.log("Title changed to:", title)}
              onDescriptionChange={(desc) => console.log("Description changed to:", desc)}
              onOptionsChange={(options) => console.log("Options changed:", options)}
              className="mb-6"
            >
              <div className="p-4">
                <EditableTable
                  data={performanceData}
                  columns={columns}
                  onUpdate={handleTableUpdate}
                  onDelete={handleDeleteRow}
                  onAdd={handleAddRow}
                  className="border-none"
                />
              </div>
            </ChartConfig>
          </div>
          
          <Statistics />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default StatsPage;
