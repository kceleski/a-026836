
import React, { useState } from 'react';
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  ChevronDown, 
  Share2, 
  Layers, 
  ArrowRight,
  Check
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Mock data for statistics
const yieldTrends = [
  { year: '2018', wheat: 6.2, corn: 8.5, sunflower: 2.4 },
  { year: '2019', wheat: 6.8, corn: 8.7, sunflower: 2.3 },
  { year: '2020', wheat: 6.5, corn: 8.9, sunflower: 2.5 },
  { year: '2021', wheat: 7.2, corn: 9.1, sunflower: 2.6 },
  { year: '2022', wheat: 7.5, corn: 9.3, sunflower: 2.8 },
  { year: '2023', wheat: 7.7, corn: 9.5, sunflower: 2.9 }
];

const monthlyRainfall = [
  { month: 'Jan', amount: 45 },
  { month: 'Fév', amount: 38 },
  { month: 'Mar', amount: 42 },
  { month: 'Avr', amount: 65 },
  { month: 'Mai', amount: 78 },
  { month: 'Juin', amount: 62 },
  { month: 'Juil', amount: 58 },
  { month: 'Août', amount: 50 },
  { month: 'Sep', amount: 55 },
  { month: 'Oct', amount: 70 },
  { month: 'Nov', amount: 60 },
  { month: 'Déc', amount: 50 }
];

const cropDistribution = [
  { name: 'Blé', value: 35, color: '#4CAF50' },
  { name: 'Maïs', value: 25, color: '#8D6E63' },
  { name: 'Tournesol', value: 15, color: '#FFC107' },
  { name: 'Orge', value: 10, color: '#2196F3' },
  { name: 'Colza', value: 8, color: '#673AB7' },
  { name: 'Autres', value: 7, color: '#9E9E9E' }
];

const profitabilityByParcel = [
  { name: 'Parcelle Nord', profitability: 1250, size: 12.5, crop: 'Blé' },
  { name: 'Parcelle Est', profitability: 980, size: 8.3, crop: 'Maïs' },
  { name: 'Parcelle Sud', profitability: 1580, size: 15.7, crop: 'Tournesol' },
  { name: 'Parcelle Ouest', profitability: 850, size: 10.2, crop: 'Orge' },
  { name: 'Parcelle Centrale', profitability: 920, size: 6.8, crop: 'Colza' }
];

const farmPerformance = [
  { subject: 'Rendement', value: 85, fullMark: 100 },
  { subject: 'Qualité', value: 90, fullMark: 100 },
  { subject: 'Rentabilité', value: 75, fullMark: 100 },
  { subject: 'Environnement', value: 80, fullMark: 100 },
  { subject: 'Innovation', value: 70, fullMark: 100 },
  { subject: 'Durabilité', value: 85, fullMark: 100 }
];

const costAnalysis = [
  { name: 'Semences', value: 1800, color: '#4CAF50' },
  { name: 'Fertilisants', value: 2200, color: '#8D6E63' },
  { name: 'Phyto', value: 1500, color: '#FFC107' },
  { name: 'Carburant', value: 1200, color: '#2196F3' },
  { name: 'Main d\'œuvre', value: 3500, color: '#673AB7' },
  { name: 'Mécanisation', value: 2800, color: '#E91E63' },
  { name: 'Divers', value: 900, color: '#9E9E9E' }
];

const Statistics = () => {
  const [period, setPeriod] = useState('year');
  const [cropFilter, setCropFilter] = useState('all');
  const [currentChart, setCurrentChart] = useState<'yields' | 'financial' | 'environmental'>('yields');
  
  const getChartTitle = () => {
    switch (currentChart) {
      case 'yields': return 'Évolution des rendements';
      case 'financial': return 'Analyse financière';
      case 'environmental': return 'Indicateurs environnementaux';
      default: return 'Statistiques';
    }
  };
  
  const getChartDescription = () => {
    switch (currentChart) {
      case 'yields': return 'Évolution des rendements par culture au fil des années';
      case 'financial': return 'Analyse détaillée des performances financières';
      case 'environmental': return 'Suivi des indicateurs de performance environnementale';
      default: return 'Données statistiques de votre exploitation';
    }
  };
  
  return (
    <div className="p-6 animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Statistiques et Analyses</h1>
          <p className="text-muted-foreground">Visualisez et analysez les données de votre exploitation</p>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg transition-colors flex-1 ${
            currentChart === 'yields' 
              ? 'bg-agri-primary text-white' 
              : 'bg-white border border-input text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setCurrentChart('yields')}
        >
          <div className="flex items-center justify-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            <span>Rendements</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-colors flex-1 ${
            currentChart === 'financial' 
              ? 'bg-agri-primary text-white' 
              : 'bg-white border border-input text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setCurrentChart('financial')}
        >
          <div className="flex items-center justify-center">
            <LineChart className="h-5 w-5 mr-2" />
            <span>Financier</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-colors flex-1 ${
            currentChart === 'environmental' 
              ? 'bg-agri-primary text-white' 
              : 'bg-white border border-input text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setCurrentChart('environmental')}
        >
          <div className="flex items-center justify-center">
            <PieChart className="h-5 w-5 mr-2" />
            <span>Environnement</span>
          </div>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{getChartTitle()}</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select 
              className="appearance-none pl-3 pr-8 py-1.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white text-sm"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="year">Annuel</option>
              <option value="month">Mensuel</option>
              <option value="week">Hebdomadaire</option>
            </select>
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              className="appearance-none pl-3 pr-8 py-1.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white text-sm"
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
            >
              <option value="all">Toutes cultures</option>
              <option value="wheat">Blé</option>
              <option value="corn">Maïs</option>
              <option value="sunflower">Tournesol</option>
              <option value="barley">Orge</option>
              <option value="rapeseed">Colza</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-6">{getChartDescription()}</p>

      {currentChart === 'yields' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Évolution des rendements par culture (t/ha)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={yieldTrends}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} t/ha`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="wheat" 
                    name="Blé" 
                    stroke="#4CAF50" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="corn" 
                    name="Maïs" 
                    stroke="#8D6E63" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sunflower" 
                    name="Tournesol" 
                    stroke="#FFC107" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Répartition des cultures (%)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={cropDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {cropDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Surface']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Précipitations mensuelles (mm)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyRainfall}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} mm`, 'Précipitations']} />
                    <Bar 
                      dataKey="amount" 
                      name="Précipitations" 
                      fill="#2196F3" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border p-6 lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">Analyse comparative des rendements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Culture</th>
                      <th className="px-4 py-2 text-left">Rendement moyen</th>
                      <th className="px-4 py-2 text-left">Référence régionale</th>
                      <th className="px-4 py-2 text-left">Différence</th>
                      <th className="px-4 py-2 text-left">Évolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Blé</td>
                      <td className="px-4 py-3">7.7 t/ha</td>
                      <td className="px-4 py-3">7.2 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">+0.5 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">↑ 2.7%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Maïs</td>
                      <td className="px-4 py-3">9.5 t/ha</td>
                      <td className="px-4 py-3">9.0 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">+0.5 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">↑ 2.2%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Tournesol</td>
                      <td className="px-4 py-3">2.9 t/ha</td>
                      <td className="px-4 py-3">2.7 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">+0.2 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">↑ 3.8%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Orge</td>
                      <td className="px-4 py-3">6.8 t/ha</td>
                      <td className="px-4 py-3">6.9 t/ha</td>
                      <td className="px-4 py-3 text-agri-danger">-0.1 t/ha</td>
                      <td className="px-4 py-3 text-agri-danger">↓ 1.2%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Colza</td>
                      <td className="px-4 py-3">3.5 t/ha</td>
                      <td className="px-4 py-3">3.3 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">+0.2 t/ha</td>
                      <td className="px-4 py-3 text-agri-success">↑ 6.1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Performance globale</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={farmPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Performance" 
                      dataKey="value" 
                      stroke="#4CAF50" 
                      fill="#4CAF50" 
                      fillOpacity={0.6} 
                    />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentChart === 'financial' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Rentabilité par parcelle (€/ha)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="size" 
                    name="Taille" 
                    unit=" ha" 
                    label={{ value: 'Taille (ha)', position: 'insideBottomRight', offset: -10 }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="profitability" 
                    name="Rentabilité" 
                    unit=" €/ha" 
                    label={{ value: 'Rentabilité (€/ha)', angle: -90, position: 'insideLeft' }} 
                  />
                  <ZAxis 
                    type="category" 
                    dataKey="crop" 
                    name="Culture" 
                    range={[100, 1000]} 
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    formatter={(value, name, props) => {
                      if (name === 'Rentabilité') return [`${value} €/ha`, name];
                      if (name === 'Taille') return [`${value} ha`, name];
                      return [value, name];
                    }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p className="font-medium">{payload[2].payload.name}</p>
                            <p>Culture: {payload[2].value}</p>
                            <p>Taille: {payload[0].value} ha</p>
                            <p>Rentabilité: {payload[1].value} €/ha</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Parcelles" 
                    data={profitabilityByParcel} 
                    fill="#4CAF50" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Analyse des coûts</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costAnalysis}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 80, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fontSize: 12 }} 
                      width={80} 
                    />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} €`, 'Montant']} />
                    <Bar 
                      dataKey="value" 
                      fill="#8D6E63" 
                      radius={[0, 4, 4, 0]} 
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Marge brute par culture (€/ha)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Culture</th>
                      <th className="px-4 py-2 text-left">Rendement</th>
                      <th className="px-4 py-2 text-left">Prix</th>
                      <th className="px-4 py-2 text-left">Produit</th>
                      <th className="px-4 py-2 text-left">Charges</th>
                      <th className="px-4 py-2 text-left">Marge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Blé</td>
                      <td className="px-4 py-3">7.7 t/ha</td>
                      <td className="px-4 py-3">220 €/t</td>
                      <td className="px-4 py-3">1,694 €</td>
                      <td className="px-4 py-3">850 €</td>
                      <td className="px-4 py-3 font-medium">844 €</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Maïs</td>
                      <td className="px-4 py-3">9.5 t/ha</td>
                      <td className="px-4 py-3">190 €/t</td>
                      <td className="px-4 py-3">1,805 €</td>
                      <td className="px-4 py-3">950 €</td>
                      <td className="px-4 py-3 font-medium">855 €</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Tournesol</td>
                      <td className="px-4 py-3">2.9 t/ha</td>
                      <td className="px-4 py-3">650 €/t</td>
                      <td className="px-4 py-3">1,885 €</td>
                      <td className="px-4 py-3">680 €</td>
                      <td className="px-4 py-3 font-medium">1,205 €</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Orge</td>
                      <td className="px-4 py-3">6.8 t/ha</td>
                      <td className="px-4 py-3">195 €/t</td>
                      <td className="px-4 py-3">1,326 €</td>
                      <td className="px-4 py-3">780 €</td>
                      <td className="px-4 py-3 font-medium">546 €</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-medium">Colza</td>
                      <td className="px-4 py-3">3.5 t/ha</td>
                      <td className="px-4 py-3">520 €/t</td>
                      <td className="px-4 py-3">1,820 €</td>
                      <td className="px-4 py-3">900 €</td>
                      <td className="px-4 py-3 font-medium">920 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Indicateurs financiers clés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">EBE (EBITDA)</p>
                <p className="text-2xl font-semibold">42,500 €</p>
                <p className="text-xs text-agri-success">32% du chiffre d'affaires</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Rentabilité</p>
                <p className="text-2xl font-semibold">18%</p>
                <p className="text-xs text-agri-success">+2.5% vs année précédente</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">ROI</p>
                <p className="text-2xl font-semibold">22%</p>
                <p className="text-xs text-muted-foreground">Sur les investissements</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentChart === 'environmental' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-4">Bilan carbone</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block relative">
                    <div className="w-32 h-32 rounded-full border-8 border-agri-primary"></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold">-15%</span>
                      <span className="text-xs text-muted-foreground">vs N-1</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    Réduction des émissions de carbone grâce aux pratiques agricoles durables.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-4">Consommation d'eau</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block relative">
                    <div className="w-32 h-32 rounded-full border-8 border-[#2196F3]"></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold">-8%</span>
                      <span className="text-xs text-muted-foreground">vs N-1</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    Réduction de la consommation d'eau par optimisation de l'irrigation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-4">Biodiversité</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block relative">
                    <div className="w-32 h-32 rounded-full border-8 border-[#FFC107]"></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold">+12%</span>
                      <span className="text-xs text-muted-foreground">vs N-1</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    Augmentation de la biodiversité sur l'exploitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Indicateurs environnementaux</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">Indicateur</th>
                    <th className="px-4 py-2 text-left">Valeur actuelle</th>
                    <th className="px-4 py-2 text-left">Objectif</th>
                    <th className="px-4 py-2 text-left">Tendance</th>
                    <th className="px-4 py-2 text-left">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Émissions CO2 (t/ha)</td>
                    <td className="px-4 py-3">2.8</td>
                    <td className="px-4 py-3">2.5</td>
                    <td className="px-4 py-3 text-agri-success">↓ -5%</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                        En progrès
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Consommation d'eau (m³/ha)</td>
                    <td className="px-4 py-3">350</td>
                    <td className="px-4 py-3">320</td>
                    <td className="px-4 py-3 text-agri-success">↓ -8%</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-success/10 text-agri-success">
                        Atteint
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Utilisation d'intrants (kg/ha)</td>
                    <td className="px-4 py-3">180</td>
                    <td className="px-4 py-3">150</td>
                    <td className="px-4 py-3 text-agri-success">↓ -12%</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                        En progrès
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Surface en agriculture bio (%)</td>
                    <td className="px-4 py-3">15%</td>
                    <td className="px-4 py-3">25%</td>
                    <td className="px-4 py-3 text-agri-success">↑ +5%</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                        En progrès
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Biodiversité (espèces/ha)</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3">15</td>
                    <td className="px-4 py-3 text-agri-success">↑ +12%</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-success/10 text-agri-success">
                        Atteint
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Certifications et engagements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-agri-primary/10 flex items-center justify-center mb-2">
                  <Check className="h-8 w-8 text-agri-primary" />
                </div>
                <h4 className="font-medium mb-1">Agriculture Raisonnée</h4>
                <p className="text-sm text-center text-muted-foreground">
                  Certifié depuis 2019
                </p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FFC107]/10 flex items-center justify-center mb-2">
                  <Layers className="h-8 w-8 text-[#FFC107]" />
                </div>
                <h4 className="font-medium mb-1">HVE Niveau 2</h4>
                <p className="text-sm text-center text-muted-foreground">
                  Haute Valeur Environnementale
                </p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#2196F3]/10 flex items-center justify-center mb-2">
                  <ArrowRight className="h-8 w-8 text-[#2196F3]" />
                </div>
                <h4 className="font-medium mb-1">En conversion Bio</h4>
                <p className="text-sm text-center text-muted-foreground">
                  15% de la surface totale
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
