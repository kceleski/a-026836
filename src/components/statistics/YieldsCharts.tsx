
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useStatistics } from '../../contexts/StatisticsContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const YieldsCharts = () => {
  const { yieldData, period } = useStatistics();

  // Formater les données pour le graphique comparatif
  const comparativeData = yieldData.map(item => ({
    name: item.name,
    actuel: item.current,
    précédent: item.previous,
    différence: item.current - item.previous,
    unité: item.unit
  }));

  // Données historiques sur plusieurs années (simulées)
  const historicalData = [
    { year: '2018', 'Canne à Sucre': 70, 'Banane': 28, 'Ananas': 40, 'Igname': 14, 'Madère': 18 },
    { year: '2019', 'Canne à Sucre': 72, 'Banane': 29, 'Ananas': 42, 'Igname': 15, 'Madère': 19 },
    { year: '2020', 'Canne à Sucre': 75, 'Banane': 30, 'Ananas': 48, 'Igname': 15, 'Madère': 20 },
    { year: '2021', 'Canne à Sucre': 78, 'Banane': 31, 'Ananas': 47, 'Igname': 16, 'Madère': 21 },
    { year: '2022', 'Canne à Sucre': 82, 'Banane': 31, 'Ananas': 46, 'Igname': 17, 'Madère': 21 },
    { year: '2023', 'Canne à Sucre': 85, 'Banane': 32, 'Ananas': 45, 'Igname': 18, 'Madère': 22 }
  ];

  // Générer les couleurs pour chaque culture
  const colors = {
    'Canne à Sucre': '#4CAF50',
    'Banane': '#FFC107',
    'Ananas': '#F44336',
    'Igname': '#9C27B0',
    'Madère': '#2196F3'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rendements actuels vs précédents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparativeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'différence') {
                      return [`${Number(value) > 0 ? '+' : ''}${value} ${props.payload.unité}`, 'Évolution'];
                    }
                    return [`${value} ${props.payload.unité}`, name];
                  }}
                />
                <Legend />
                <Bar name="Rendement actuel" dataKey="actuel" fill="#4CAF50" />
                <Bar name="Rendement précédent" dataKey="précédent" fill="#8D6E63" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Évolution historique des rendements ({period === 'year' ? 'annuelle' : 'mensuelle'})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} t/ha`, '']} />
                <Legend />
                {Object.keys(colors).map((crop) => (
                  <Line
                    key={crop}
                    type="monotone"
                    dataKey={crop}
                    stroke={colors[crop as keyof typeof colors]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {yieldData.map((item) => {
          const change = item.current - item.previous;
          const changePercent = ((change / item.previous) * 100).toFixed(1);
          const isPositive = change >= 0;
          
          return (
            <Card key={item.name}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[item.name as keyof typeof colors] || '#4CAF50' }}></span>
                  {item.name}
                </h3>
                <div className="text-2xl font-bold">{item.current} {item.unit}</div>
                <div className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{isPositive ? '+' : ''}{change} {item.unit} ({isPositive ? '+' : ''}{changePercent}%)</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default YieldsCharts;
