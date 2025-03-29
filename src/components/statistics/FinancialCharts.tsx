
import React from 'react';
import { 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart,
  Bar
} from 'recharts';

const profitabilityByParcel = [
  { name: 'Parcelle Nord', profitability: 1250, size: 12.5, crop: 'Blé' },
  { name: 'Parcelle Est', profitability: 980, size: 8.3, crop: 'Maïs' },
  { name: 'Parcelle Sud', profitability: 1580, size: 15.7, crop: 'Tournesol' },
  { name: 'Parcelle Ouest', profitability: 850, size: 10.2, crop: 'Orge' },
  { name: 'Parcelle Centrale', profitability: 920, size: 6.8, crop: 'Colza' }
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

const FinancialCharts = () => {
  return (
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
  );
};

export default FinancialCharts;
