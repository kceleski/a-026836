
import React, { useState } from 'react';
import { EditableTable, Column } from './ui/editable-table';
import { Trash2, X, Save, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from "@/hooks/use-toast";

// Initial mock data for the culture details
const initialCultureData = [
  {
    id: 1,
    name: 'Igname',
    scientificName: 'Dioscorea alata',
    family: 'Dioscoreaceae',
    origin: 'Asie du Sud-Est',
    growingSeason: 'Mai-Décembre',
    soilType: 'Argileux, bien drainé',
    waterNeeds: 'Modérés',
    fertilization: 'NPK 10-10-20',
    pests: 'Charançons, cochenilles',
    diseases: 'Anthracnose',
    notes: 'Culture importante en Guadeloupe, plusieurs variétés locales'
  },
  {
    id: 2,
    name: 'Madère',
    scientificName: 'Colocasia esculenta',
    family: 'Araceae',
    origin: 'Asie du Sud-Est',
    growingSeason: 'Toute l\'année',
    soilType: 'Humide, riche en matière organique',
    waterNeeds: 'Élevés',
    fertilization: 'NPK 14-14-14',
    pests: 'Pucerons',
    diseases: 'Pourriture des racines',
    notes: 'Cultivé dans les zones humides'
  },
  {
    id: 3,
    name: 'Christophine',
    scientificName: 'Sechium edule',
    family: 'Cucurbitaceae',
    origin: 'Amérique centrale',
    growingSeason: 'Toute l\'année',
    soilType: 'Bien drainé, riche',
    waterNeeds: 'Modérés à élevés',
    fertilization: 'NPK 12-12-17',
    pests: 'Mouches blanches, acariens',
    diseases: 'Mildiou',
    notes: 'Culture sur treillage'
  }
];

export const CultureDetailTable = ({ showAddForm, setShowAddForm }: { showAddForm?: boolean, setShowAddForm?: (show: boolean) => void }) => {
  const { toast } = useToast();
  const [cultureData, setCultureData] = useState(initialCultureData);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [newCulture, setNewCulture] = useState({
    name: '',
    scientificName: '',
    family: '',
    origin: '',
    growingSeason: '',
    soilType: '',
    waterNeeds: '',
    fertilization: '',
    pests: '',
    diseases: '',
    notes: ''
  });

  // If showAddForm is provided (from parent), use it, otherwise use local state
  const localShowAddForm = showAddForm !== undefined ? showAddForm : isAddFormVisible;
  const localSetShowAddForm = setShowAddForm || setIsAddFormVisible;

  const handleUpdateCulture = (rowIndex: number, columnId: string, value: any) => {
    const updatedData = [...cultureData];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnId]: value
    };
    setCultureData(updatedData);
    
    toast({
      title: "Mise à jour réussie",
      description: `Information mise à jour pour ${updatedData[rowIndex].name}`,
    });
  };

  const handleAddCulture = () => {
    if (!newCulture.name) {
      toast({
        title: "Erreur",
        description: "Le nom de la culture est obligatoire",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...cultureData.map(c => c.id), 0) + 1;
    setCultureData([...cultureData, { ...newCulture, id: newId }]);
    localSetShowAddForm(false);
    
    // Reset form
    setNewCulture({
      name: '',
      scientificName: '',
      family: '',
      origin: '',
      growingSeason: '',
      soilType: '',
      waterNeeds: '',
      fertilization: '',
      pests: '',
      diseases: '',
      notes: ''
    });
    
    toast({
      title: "Culture ajoutée",
      description: `${newCulture.name} a été ajoutée à la liste des cultures`
    });
  };

  const handleDeleteCulture = (rowIndex: number) => {
    const cultureToDelete = cultureData[rowIndex];
    const updatedData = cultureData.filter((_, index) => index !== rowIndex);
    setCultureData(updatedData);
    
    toast({
      title: "Culture supprimée",
      description: `${cultureToDelete.name} a été supprimée de la liste`
    });
  };

  const columns: Column[] = [
    { id: 'name', header: 'Nom', accessorKey: 'name', isEditable: true },
    { id: 'scientificName', header: 'Nom scientifique', accessorKey: 'scientificName', isEditable: true },
    { id: 'growingSeason', header: 'Saison de culture', accessorKey: 'growingSeason', isEditable: true },
    { id: 'soilType', header: 'Type de sol', accessorKey: 'soilType', isEditable: true },
    { id: 'waterNeeds', header: 'Besoin en eau', accessorKey: 'waterNeeds', isEditable: true }
  ];

  return (
    <div>
      <EditableTable
        data={cultureData}
        columns={columns}
        onUpdate={handleUpdateCulture}
        onDelete={handleDeleteCulture}
        onAdd={localShowAddForm ? undefined : () => localSetShowAddForm(true)}
        sortable={true}
      />
      
      {localShowAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ajouter une nouvelle culture</h2>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => localSetShowAddForm(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom de la culture *</Label>
                  <Input 
                    id="name"
                    type="text" 
                    className="mt-1"
                    value={newCulture.name}
                    onChange={(e) => setNewCulture({...newCulture, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="scientificName">Nom scientifique</Label>
                  <Input 
                    id="scientificName"
                    type="text" 
                    className="mt-1"
                    value={newCulture.scientificName}
                    onChange={(e) => setNewCulture({...newCulture, scientificName: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="family">Famille</Label>
                  <Input 
                    id="family"
                    type="text" 
                    className="mt-1"
                    value={newCulture.family}
                    onChange={(e) => setNewCulture({...newCulture, family: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="origin">Origine</Label>
                  <Input 
                    id="origin"
                    type="text" 
                    className="mt-1"
                    value={newCulture.origin}
                    onChange={(e) => setNewCulture({...newCulture, origin: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="growingSeason">Saison de culture</Label>
                  <Input 
                    id="growingSeason"
                    type="text" 
                    className="mt-1"
                    value={newCulture.growingSeason}
                    onChange={(e) => setNewCulture({...newCulture, growingSeason: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="soilType">Type de sol</Label>
                  <Input 
                    id="soilType"
                    type="text" 
                    className="mt-1"
                    value={newCulture.soilType}
                    onChange={(e) => setNewCulture({...newCulture, soilType: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="waterNeeds">Besoin en eau</Label>
                  <Input 
                    id="waterNeeds"
                    type="text" 
                    className="mt-1"
                    value={newCulture.waterNeeds}
                    onChange={(e) => setNewCulture({...newCulture, waterNeeds: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="fertilization">Fertilisation</Label>
                  <Input 
                    id="fertilization"
                    type="text" 
                    className="mt-1"
                    value={newCulture.fertilization}
                    onChange={(e) => setNewCulture({...newCulture, fertilization: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="pests">Ravageurs</Label>
                  <Input 
                    id="pests"
                    type="text" 
                    className="mt-1"
                    value={newCulture.pests}
                    onChange={(e) => setNewCulture({...newCulture, pests: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="diseases">Maladies</Label>
                  <Input 
                    id="diseases"
                    type="text" 
                    className="mt-1"
                    value={newCulture.diseases}
                    onChange={(e) => setNewCulture({...newCulture, diseases: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  className="mt-1"
                  rows={3}
                  value={newCulture.notes}
                  onChange={(e) => setNewCulture({...newCulture, notes: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => localSetShowAddForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  type="button"
                  onClick={handleAddCulture}
                >
                  <Save className="mr-2" />
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
