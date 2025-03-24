
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { EditableField } from './ui/editable-field';
import { Trash2, Plus } from 'lucide-react';

interface CropData {
  id: number;
  name: string;
  variety: string;
  region: string;
  harvestPeriod: string;
  specificNotes: string;
}

const GuadeloupeSpecificCrops = () => {
  const [crops, setCrops] = useState<CropData[]>([
    { 
      id: 1, 
      name: 'Canne à Sucre', 
      variety: 'R579', 
      region: 'Grande-Terre', 
      harvestPeriod: 'Février-Juin', 
      specificNotes: 'Résistante à la sécheresse'
    },
    { 
      id: 2, 
      name: 'Banane', 
      variety: 'Poyo', 
      region: 'Basse-Terre', 
      harvestPeriod: 'Toute l\'année', 
      specificNotes: 'Adaptée aux sols volcaniques'
    },
    { 
      id: 3, 
      name: 'Igname', 
      variety: 'Pacala', 
      region: 'Nord Grande-Terre', 
      harvestPeriod: 'Décembre-Mars', 
      specificNotes: 'Tubercule traditionnel'
    },
    { 
      id: 4, 
      name: 'Ananas', 
      variety: 'Bouteille', 
      region: 'Capesterre', 
      harvestPeriod: 'Juillet-Octobre', 
      specificNotes: 'Variété locale très sucrée'
    },
    { 
      id: 5, 
      name: 'Madère', 
      variety: 'Blanche', 
      region: 'Toute l\'île', 
      harvestPeriod: 'Septembre-Décembre', 
      specificNotes: 'Culture vivrière essentielle'
    },
  ]);

  const [title, setTitle] = useState('Cultures Spécifiques de la Guadeloupe');
  const [description, setDescription] = useState('Informations sur les cultures locales et régionales');

  const handleEdit = (id: number, field: keyof CropData, value: string) => {
    setCrops(crops.map(crop => 
      crop.id === id ? { ...crop, [field]: value } : crop
    ));
  };

  const handleDelete = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(0, ...crops.map(c => c.id)) + 1;
    setCrops([...crops, {
      id: newId,
      name: 'Nouvelle Culture',
      variety: 'Variété',
      region: 'Région',
      harvestPeriod: 'Période',
      specificNotes: 'Notes spécifiques'
    }]);
  };

  // Correction: convertir correctement les types pour EditableField
  const handleTitleChange = (value: string | number) => {
    setTitle(String(value));
  };

  const handleDescriptionChange = (value: string | number) => {
    setDescription(String(value));
  };

  return (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          <EditableField
            value={title}
            onSave={handleTitleChange}
            className="inline-block"
          />
        </h2>
        <p className="text-muted-foreground">
          <EditableField
            value={description}
            onSave={handleDescriptionChange}
            className="inline-block"
          />
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Variété</TableHead>
            <TableHead>Région</TableHead>
            <TableHead>Période de Récolte</TableHead>
            <TableHead>Notes Spécifiques</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crops.map((crop) => (
            <TableRow key={crop.id}>
              <TableCell>
                <EditableField
                  value={crop.name}
                  onSave={(value) => handleEdit(crop.id, 'name', value.toString())}
                />
              </TableCell>
              <TableCell>
                <EditableField
                  value={crop.variety}
                  onSave={(value) => handleEdit(crop.id, 'variety', value.toString())}
                />
              </TableCell>
              <TableCell>
                <EditableField
                  value={crop.region}
                  onSave={(value) => handleEdit(crop.id, 'region', value.toString())}
                />
              </TableCell>
              <TableCell>
                <EditableField
                  value={crop.harvestPeriod}
                  onSave={(value) => handleEdit(crop.id, 'harvestPeriod', value.toString())}
                />
              </TableCell>
              <TableCell>
                <EditableField
                  value={crop.specificNotes}
                  onSave={(value) => handleEdit(crop.id, 'specificNotes', value.toString())}
                />
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => handleDelete(crop.id)}
                  className="p-1.5 hover:bg-agri-danger/10 text-agri-danger rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-4">
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 text-sm bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une culture
        </button>
      </div>
    </div>
  );
};

export default GuadeloupeSpecificCrops;
