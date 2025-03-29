
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Edit, Save, Download, UploadCloud, AlertTriangle, CloudRain } from 'lucide-react';
import { EditableField } from './ui/editable-field';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from "@/hooks/use-toast";

// Initial data for rainfall by region
const initialRainfallData = [
  { region: 'Basse-Terre (Côte sous le vent)', rainfallMm: 1800, expectedMm: 1950, status: 'normal' },
  { region: 'Basse-Terre (Côte au vent)', rainfallMm: 2500, expectedMm: 2400, status: 'excess' },
  { region: 'Grande-Terre (Nord)', rainfallMm: 1100, expectedMm: 1350, status: 'deficit' },
  { region: 'Grande-Terre (Sud)', rainfallMm: 1250, expectedMm: 1300, status: 'normal' },
  { region: 'Marie-Galante', rainfallMm: 1200, expectedMm: 1250, status: 'normal' },
  { region: 'Les Saintes', rainfallMm: 950, expectedMm: 1100, status: 'deficit' }
];

// Monthly data for selected region
const initialMonthlyData = [
  { month: 'Jan', current: 95, average: 110, min: 80, max: 150 },
  { month: 'Fév', current: 85, average: 90, min: 70, max: 120 },
  { month: 'Mar', current: 90, average: 100, min: 75, max: 130 },
  { month: 'Avr', current: 110, average: 120, min: 90, max: 160 },
  { month: 'Mai', current: 150, average: 140, min: 100, max: 180 },
  { month: 'Juin', current: 180, average: 170, min: 130, max: 220 },
  { month: 'Juil', current: 190, average: 180, min: 140, max: 230 },
  { month: 'Aoû', current: 210, average: 190, min: 150, max: 240 },
  { month: 'Sep', current: 220, average: 200, min: 160, max: 250 },
  { month: 'Oct', current: 180, average: 170, min: 130, max: 210 },
  { month: 'Nov', current: 150, average: 140, min: 100, max: 190 },
  { month: 'Déc', current: 120, average: 130, min: 90, max: 170 }
];

const GuadeloupeRainfallTracking = () => {
  const { toast } = useToast();
  const [rainfallData, setRainfallData] = useState(initialRainfallData);
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [year, setYear] = useState('2023');

  // Function to update rainfall data for a region
  const handleUpdateRainfall = (region: string, value: number) => {
    const updatedData = rainfallData.map(item => {
      if (item.region === region) {
        const newStatus = 
          value < item.expectedMm * 0.9 ? 'deficit' :
          value > item.expectedMm * 1.1 ? 'excess' : 'normal';
        
        return { ...item, rainfallMm: value, status: newStatus };
      }
      return item;
    });
    
    setRainfallData(updatedData);
    
    toast({
      title: "Précipitations mises à jour",
      description: `Les données pour ${region} ont été mises à jour`
    });
  };

  // Function to update monthly data
  const handleUpdateMonthlyData = (month: string, value: number) => {
    if (!selectedRegion) return;
    
    const updatedData = monthlyData.map(item => {
      if (item.month === month) {
        return { ...item, current: value };
      }
      return item;
    });
    
    setMonthlyData(updatedData);
    
    toast({
      title: "Données mensuelles mises à jour",
      description: `Les précipitations de ${month} ont été mises à jour`
    });
  };

  // Function to get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deficit': return '#f87171';
      case 'excess': return '#60a5fa';
      case 'normal': return '#4ade80';
      default: return '#4ade80';
    }
  };

  // Function to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'deficit': return 'Déficit';
      case 'excess': return 'Excès';
      case 'normal': return 'Normal';
      default: return 'Normal';
    }
  };

  // Handler for selecting a region
  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    
    // In a real app, this would fetch data specific to the region
    // For now we'll just update the title in the chart
  };

  // Handler for saving edited data
  const handleSaveData = () => {
    setIsEditMode(false);
    toast({
      title: "Données enregistrées",
      description: "Toutes les modifications ont été sauvegardées avec succès"
    });
  };

  // Chart data for region comparison
  const regionComparisonData = rainfallData.map(item => ({
    name: item.region.split('(')[0].trim(),
    actuel: item.rainfallMm,
    attendu: item.expectedMm,
  }));

  // Check for regions with significant deficit
  const deficitRegions = rainfallData.filter(item => item.status === 'deficit');
  const hasDeficit = deficitRegions.length > 0;

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Suivi des Précipitations en Guadeloupe</h2>
          <p className="text-muted-foreground">Analysez les tendances pluviométriques pour optimiser vos cultures</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Input 
              type="number" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-24"
              min="2000"
              max="2050"
            />
          </div>
          {isEditMode ? (
            <Button onClick={handleSaveData}>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {hasDeficit && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="font-medium text-orange-700">Alert de déficit pluviométrique</h3>
          </div>
          <p className="mt-2 text-orange-600">
            Les régions suivantes présentent un déficit de précipitations significatif:
          </p>
          <ul className="mt-1 pl-6 list-disc text-orange-600">
            {deficitRegions.map(region => (
              <li key={region.region}>
                {region.region}: {region.rainfallMm}mm (déficit de {Math.round((region.expectedMm - region.rainfallMm) / region.expectedMm * 100)}%)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Regional data */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-3">Précipitations par région</h3>
            <div className="space-y-4">
              {rainfallData.map(item => (
                <div 
                  key={item.region} 
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedRegion === item.region ? 'border-agri-primary bg-agri-primary/5' : ''
                  }`}
                  onClick={() => handleSelectRegion(item.region)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{item.region}</span>
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'deficit' 
                          ? 'bg-red-100 text-red-600' 
                          : item.status === 'excess'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Actuel:</span>
                    {isEditMode ? (
                      <EditableField
                        value={item.rainfallMm}
                        type="number"
                        onSave={(value) => handleUpdateRainfall(item.region, Number(value))}
                        className="font-semibold"
                        inputClassName="w-20"
                      />
                    ) : (
                      <span className="font-semibold">{item.rainfallMm} mm</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Attendu:</span>
                    <span>{item.expectedMm} mm</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${Math.min(100, (item.rainfallMm / item.expectedMm) * 100)}%`,
                        backgroundColor: getStatusColor(item.status)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-3">Ajouter des données</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Type</label>
                <select className="w-full h-10 border border-input rounded-md px-3">
                  <option>Relevé mensuel</option>
                  <option>Relevé journalier</option>
                  <option>Prévision météo</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Fichier</label>
                <div className="border border-dashed border-input rounded-md p-4 text-center">
                  <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Glissez un fichier CSV ou cliquez pour parcourir
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Parcourir
                  </Button>
                </div>
              </div>
              <Button className="w-full mt-2">
                <CloudRain className="mr-2 h-4 w-4" />
                Importer les données
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Charts */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-3">Comparaison par région - {year}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regionComparisonData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                  barGap={0}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tickMargin={20}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Précipitations (mm)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' } 
                    }} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} mm`, '']}
                    labelFormatter={(label) => `Région: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="actuel" name="Précipitations actuelles" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendu" name="Précipitations attendues" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-3">
              Précipitations Mensuelles {selectedRegion ? `- ${selectedRegion}` : ''} ({year})
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    label={{ 
                      value: 'Précipitations (mm)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' } 
                    }} 
                  />
                  <Tooltip formatter={(value) => [`${value} mm`, '']} />
                  <Legend />
                  <Bar 
                    dataKey="current" 
                    name="Précipitations actuelles" 
                    fill="#4ade80" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="average" 
                    name="Moyenne historique" 
                    fill="#60a5fa" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {selectedRegion && isEditMode && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Modifier les données mensuelles</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {monthlyData.map(item => (
                    <div key={item.month} className="p-2 border rounded">
                      <div className="text-xs font-medium">{item.month}</div>
                      <EditableField
                        value={item.current}
                        type="number"
                        onSave={(value) => handleUpdateMonthlyData(item.month, Number(value))}
                        className="text-sm"
                        inputClassName="w-full"
                      />
                      <div className="text-xs text-muted-foreground mt-1">Moy: {item.average}mm</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuadeloupeRainfallTracking;
