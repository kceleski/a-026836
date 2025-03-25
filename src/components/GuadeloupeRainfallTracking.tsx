
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { CloudRain, Droplets, Thermometer, Calendar, Edit, Save, X, Plus } from 'lucide-react';
import { EditableField } from './ui/editable-field';
import { EditableTable, Column } from './ui/editable-table';
import { toast } from 'sonner';

// Données de précipitations moyennes mensuelles pour différentes régions de Guadeloupe
const rainfallData = [
  { month: 'Jan', basseTerre: 230, grandeTerre: 85, marieGalante: 60, lesSaintes: 70 },
  { month: 'Fév', basseTerre: 170, grandeTerre: 65, marieGalante: 45, lesSaintes: 55 },
  { month: 'Mar', basseTerre: 150, grandeTerre: 55, marieGalante: 40, lesSaintes: 50 },
  { month: 'Avr', basseTerre: 180, grandeTerre: 70, marieGalante: 50, lesSaintes: 60 },
  { month: 'Mai', basseTerre: 250, grandeTerre: 90, marieGalante: 65, lesSaintes: 75 },
  { month: 'Juin', basseTerre: 220, grandeTerre: 80, marieGalante: 60, lesSaintes: 70 },
  { month: 'Juil', basseTerre: 240, grandeTerre: 85, marieGalante: 65, lesSaintes: 75 },
  { month: 'Août', basseTerre: 280, grandeTerre: 100, marieGalante: 75, lesSaintes: 85 },
  { month: 'Sep', basseTerre: 300, grandeTerre: 120, marieGalante: 90, lesSaintes: 95 },
  { month: 'Oct', basseTerre: 320, grandeTerre: 130, marieGalante: 100, lesSaintes: 105 },
  { month: 'Nov', basseTerre: 280, grandeTerre: 110, marieGalante: 85, lesSaintes: 90 },
  { month: 'Déc', basseTerre: 250, grandeTerre: 95, marieGalante: 70, lesSaintes: 80 },
];

// Données de précipitations pour les parcelles spécifiques
interface RainfallRecordData {
  id: number;
  date: string;
  location: string;
  amount: number;
  crops: string;
  notes: string;
}

const initialRainfallRecords: RainfallRecordData[] = [
  { id: 1, date: '2023-08-15', location: 'Grande-Terre Nord', amount: 35, crops: 'Canne à Sucre', notes: 'Fortes pluies après une période sèche' },
  { id: 2, date: '2023-08-20', location: 'Basse-Terre Sud', amount: 75, crops: 'Banane', notes: 'Précipitations normales pour la saison' },
  { id: 3, date: '2023-08-25', location: 'Marie-Galante', amount: 15, crops: 'Madère', notes: 'Précipitations faibles, irrigation nécessaire' },
  { id: 4, date: '2023-09-02', location: 'Capesterre', amount: 65, crops: 'Ananas', notes: 'Pluies modérées, bon pour les plantations' },
  { id: 5, date: '2023-09-08', location: 'Nord Grande-Terre', amount: 20, crops: 'Igname', notes: 'Légère pluie après une longue période sèche' },
];

// Colonnes pour le tableau éditable
const columns: Column[] = [
  { id: 'date', header: 'Date', accessorKey: 'date', isEditable: true, width: '120px' },
  { id: 'location', header: 'Localisation', accessorKey: 'location', isEditable: true },
  { id: 'amount', header: 'Quantité (mm)', accessorKey: 'amount', type: 'number', isEditable: true, width: '120px' },
  { id: 'crops', header: 'Cultures affectées', accessorKey: 'crops', isEditable: true },
  { id: 'notes', header: 'Notes', accessorKey: 'notes', isEditable: true },
];

// Données pour le graphique de moyenne des précipitations annuelles par région
const annualAverageData = [
  { name: 'Basse-Terre', value: 2800 },
  { name: 'Grande-Terre', value: 1100 },
  { name: 'Marie-Galante', value: 900 },
  { name: 'Les Saintes', value: 950 },
  { name: 'La Désirade', value: 800 },
];

type ChartType = 'monthly' | 'annual' | 'records';

const GuadeloupeRainfallTracking = () => {
  const [title, setTitle] = useState('Suivi des Précipitations en Guadeloupe');
  const [description, setDescription] = useState('Analysez les tendances pluviométriques et leur impact sur vos cultures');
  const [records, setRecords] = useState<RainfallRecordData[]>(initialRainfallRecords);
  const [chartType, setChartType] = useState<ChartType>('monthly');
  
  // Fonction pour mettre à jour les enregistrements de pluie
  const handleRecordUpdate = (rowIndex: number, columnId: string, value: any) => {
    const updatedRecords = [...records];
    const record = { ...updatedRecords[rowIndex] };
    
    if (columnId === 'amount') {
      record[columnId as keyof RainfallRecordData] = Number(value);
    } else {
      record[columnId as keyof RainfallRecordData] = String(value);
    }
    
    updatedRecords[rowIndex] = record;
    setRecords(updatedRecords);
    toast.success('Enregistrement mis à jour');
  };
  
  // Fonction pour supprimer un enregistrement
  const handleDeleteRecord = (rowIndex: number) => {
    const updatedRecords = [...records];
    updatedRecords.splice(rowIndex, 1);
    setRecords(updatedRecords);
    toast.success('Enregistrement supprimé');
  };
  
  // Fonction pour ajouter un nouvel enregistrement
  const handleAddRecord = (newRow: Record<string, any>) => {
    const newId = Math.max(0, ...records.map(r => r.id)) + 1;
    
    const newRecord: RainfallRecordData = {
      id: newId,
      date: String(newRow.date || new Date().toISOString().split('T')[0]),
      location: String(newRow.location || ''),
      amount: Number(newRow.amount || 0),
      crops: String(newRow.crops || ''),
      notes: String(newRow.notes || ''),
    };
    
    setRecords([...records, newRecord]);
    toast.success('Nouvel enregistrement ajouté');
  };
  
  // Fonction de mise à jour du titre
  const handleTitleChange = (value: string | number) => {
    setTitle(String(value));
  };
  
  // Fonction de mise à jour de la description
  const handleDescriptionChange = (value: string | number) => {
    setDescription(String(value));
  };
  
  return (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="mb-6">
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
      
      <div className="flex space-x-2 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg ${chartType === 'monthly' ? 'bg-agri-primary text-white' : 'bg-muted'}`}
          onClick={() => setChartType('monthly')}
        >
          Mensuel
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${chartType === 'annual' ? 'bg-agri-primary text-white' : 'bg-muted'}`}
          onClick={() => setChartType('annual')}
        >
          Annuel
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${chartType === 'records' ? 'bg-agri-primary text-white' : 'bg-muted'}`}
          onClick={() => setChartType('records')}
        >
          Enregistrements
        </button>
      </div>
      
      {chartType === 'monthly' && (
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CloudRain className="h-5 w-5 mr-2 text-blue-500" />
            Précipitations mensuelles moyennes par région
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rainfallData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit=" mm" />
                <Tooltip formatter={(value) => [`${value} mm`, 'Précipitations']} />
                <Legend />
                <Bar dataKey="basseTerre" name="Basse-Terre" fill="#3498db" />
                <Bar dataKey="grandeTerre" name="Grande-Terre" fill="#2ecc71" />
                <Bar dataKey="marieGalante" name="Marie-Galante" fill="#e74c3c" />
                <Bar dataKey="lesSaintes" name="Les Saintes" fill="#9b59b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Note: Données basées sur les moyennes historiques. Vous pouvez utiliser ces informations 
            pour planifier vos cultures et vos besoins en irrigation.
          </p>
        </div>
      )}
      
      {chartType === 'annual' && (
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-blue-500" />
            Moyenne annuelle des précipitations par région
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={annualAverageData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit=" mm" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value} mm`, 'Précipitations annuelles']} />
                <Bar dataKey="value" name="Précipitations" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="text-sm font-medium mb-1">Zone la plus humide</h4>
              <p className="text-xl font-bold text-blue-600">Basse-Terre</p>
              <p className="text-sm text-muted-foreground">2800 mm/an</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="text-sm font-medium mb-1">Zone la plus sèche</h4>
              <p className="text-xl font-bold text-orange-600">La Désirade</p>
              <p className="text-sm text-muted-foreground">800 mm/an</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="text-sm font-medium mb-1">Période la plus humide</h4>
              <p className="text-xl font-bold text-green-600">Août - Novembre</p>
              <p className="text-sm text-muted-foreground">Saison des pluies</p>
            </div>
          </div>
        </div>
      )}
      
      {chartType === 'records' && (
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Enregistrement des précipitations
            </h3>
            <EditableTable
              data={records}
              columns={columns}
              onUpdate={handleRecordUpdate}
              onDelete={handleDeleteRecord}
              onAdd={handleAddRecord}
              className="border-none"
            />
          </div>
          
          {records.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Tendance des précipitations récentes</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis unit=" mm" />
                    <Tooltip
                      formatter={(value) => [`${value} mm`, 'Précipitations']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    />
                    <Line type="monotone" dataKey="amount" stroke="#3498db" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Recommandations basées sur les précipitations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium flex items-center mb-2">
              <CloudRain className="h-4 w-4 mr-2 text-blue-500" />
              Zones humides (Basse-Terre)
            </h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Cultivez des variétés résistantes à l'humidité excessive</li>
              <li>Assurez un bon drainage des parcelles</li>
              <li>Surveillez les maladies fongiques</li>
              <li>Cultures recommandées: Banane, Cacao, Taro</li>
            </ul>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium flex items-center mb-2">
              <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
              Zones sèches (Grande-Terre, La Désirade)
            </h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Mettez en place des systèmes d'irrigation efficaces</li>
              <li>Choisissez des variétés résistantes à la sécheresse</li>
              <li>Pratiquez le paillage pour conserver l'humidité</li>
              <li>Cultures recommandées: Canne à sucre, Melon, Igname</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuadeloupeRainfallTracking;
