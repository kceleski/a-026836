
import React, { useState } from 'react';
import { CultureDetailTable } from './CultureDetailTable';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GuadeloupeSpecificCrops = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCulture = () => {
    setShowAddForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Cultures Spécifiques de Guadeloupe</h2>
          <p className="text-muted-foreground">Gérez les informations sur vos cultures locales</p>
        </div>
        <Button onClick={handleAddCulture}>
          <Plus className="mr-2" />
          Ajouter une culture
        </Button>
      </div>
      
      <div className="bg-white rounded-xl border p-6 mb-6">
        <CultureDetailTable showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
      </div>
    </div>
  );
};

export default GuadeloupeSpecificCrops;
