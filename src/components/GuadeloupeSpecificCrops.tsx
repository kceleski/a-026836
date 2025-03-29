
import React, { useState } from 'react';
import { CultureDetailTable } from './CultureDetailTable';
import { Button } from './ui/button';
import { Plus, Download, Upload, Filter, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from './ui/input';

const GuadeloupeSpecificCrops = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleAddCulture = () => {
    setShowAddForm(true);
  };

  const handleExportData = () => {
    toast({
      title: "Export réussi",
      description: "Les données des cultures ont été exportées en CSV"
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import de données",
      description: "Veuillez sélectionner un fichier CSV à importer"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Cultures Spécifiques de Guadeloupe</h2>
          <p className="text-muted-foreground">Gérez les informations sur vos cultures locales</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button onClick={handleAddCulture}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une culture
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Rechercher une culture..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select 
            className="h-10 appearance-none pl-3 pr-8 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Toutes les cultures</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Légumes</option>
            <option value="tubers">Tubercules</option>
            <option value="cash">Cultures de rente</option>
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-6 mb-6">
        <CultureDetailTable 
          showAddForm={showAddForm} 
          setShowAddForm={setShowAddForm} 
          searchTerm={searchTerm}
          filterType={filterType}
        />
      </div>
    </div>
  );
};

export default GuadeloupeSpecificCrops;
