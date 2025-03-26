
import React, { useState } from 'react';
import { EditableField } from './ui/editable-field';
import { Plus, Edit, Trash2, CirclePlus } from 'lucide-react';
import { toast } from 'sonner';

interface Culture {
  id: number;
  name: string;
  variety: string;
  region: string;
  harvestPeriod: string;
  specificNotes: string;
  yieldPerHectare?: string;
  soilType?: string;
  waterNeeds?: string;
  plantingDepth?: string;
  rowSpacing?: string;
  marketValue?: string;
}

export const CultureDetailTable = () => {
  const [cultures, setCultures] = useState<Culture[]>([
    {
      id: 1,
      name: "Canne à Sucre",
      variety: "R579",
      region: "Grande-Terre",
      harvestPeriod: "Février-Juin",
      specificNotes: "Résistante à la sécheresse et à fort rendement",
      yieldPerHectare: "80-100 tonnes/ha",
      soilType: "Sols argileux profonds",
      waterNeeds: "1500-2000mm/an",
      plantingDepth: "20-25cm",
      rowSpacing: "1.5m",
      marketValue: "45-50€/tonne"
    },
    {
      id: 2,
      name: "Banane",
      variety: "Poyo",
      region: "Basse-Terre",
      harvestPeriod: "Toute l'année",
      specificNotes: "Adaptée aux sols volcaniques, sensible aux cyclones",
      yieldPerHectare: "30-40 tonnes/ha",
      soilType: "Sols volcaniques riches",
      waterNeeds: "2000-2500mm/an",
      plantingDepth: "30-40cm",
      rowSpacing: "2m",
      marketValue: "0.90-1.20€/kg"
    }
  ]);

  const handleUpdate = (id: number, field: keyof Culture, value: string) => {
    setCultures(cultures.map(culture => 
      culture.id === id ? { ...culture, [field]: value } : culture
    ));
    toast.success("Information mise à jour");
  };

  const handleDelete = (id: number) => {
    setCultures(cultures.filter(culture => culture.id !== id));
    toast.success("Culture supprimée");
  };

  const handleAdd = () => {
    const newCulture: Culture = {
      id: cultures.length + 1,
      name: "Nouvelle Culture",
      variety: "Variété",
      region: "Région",
      harvestPeriod: "Période",
      specificNotes: "Notes spécifiques",
    };
    setCultures([...cultures, newCulture]);
    toast.success("Nouvelle culture ajoutée");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cultures Spécifiques de la Guadeloupe</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une culture
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Variété</th>
              <th className="px-4 py-3 text-left">Région</th>
              <th className="px-4 py-3 text-left">Période de Récolte</th>
              <th className="px-4 py-3 text-left">Notes Spécifiques</th>
              <th className="px-4 py-3 text-left">Rendement/ha</th>
              <th className="px-4 py-3 text-left">Type de Sol</th>
              <th className="px-4 py-3 text-left">Besoins en Eau</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cultures.map((culture) => (
              <tr key={culture.id} className="border-t hover:bg-muted/30">
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.name}
                    onSave={(value) => handleUpdate(culture.id, 'name', String(value))}
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.variety}
                    onSave={(value) => handleUpdate(culture.id, 'variety', String(value))}
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.region}
                    onSave={(value) => handleUpdate(culture.id, 'region', String(value))}
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.harvestPeriod}
                    onSave={(value) => handleUpdate(culture.id, 'harvestPeriod', String(value))}
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.specificNotes}
                    onSave={(value) => handleUpdate(culture.id, 'specificNotes', String(value))}
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.yieldPerHectare || ''}
                    onSave={(value) => handleUpdate(culture.id, 'yieldPerHectare', String(value))}
                    placeholder="Rendement/ha"
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.soilType || ''}
                    onSave={(value) => handleUpdate(culture.id, 'soilType', String(value))}
                    placeholder="Type de sol"
                  />
                </td>
                <td className="px-4 py-3">
                  <EditableField
                    value={culture.waterNeeds || ''}
                    onSave={(value) => handleUpdate(culture.id, 'waterNeeds', String(value))}
                    placeholder="Besoins en eau"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toast.success("Détails affichés")}
                      className="p-1.5 hover:bg-agri-primary/10 text-agri-primary rounded"
                    >
                      <CirclePlus className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(culture.id)}
                      className="p-1.5 hover:bg-agri-danger/10 text-agri-danger rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

