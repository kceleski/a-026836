
import React from 'react';
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
  Radar
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

const farmPerformance = [
  { subject: 'Rendement', value: 85, fullMark: 100 },
  { subject: 'Qualité', value: 90, fullMark: 100 },
  { subject: 'Rentabilité', value: 75, fullMark: 100 },
  { subject: 'Environnement', value: 80, fullMark: 100 },
  { subject: 'Innovation', value: 70, fullMark: 100 },
  { subject: 'Durabilité', value: 85, fullMark: 100 }
];

const YieldsCharts = () => {
  return (
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
  );
};

export default YieldsCharts;
