
import React from 'react';
import StatisticsHeader from './statistics/StatisticsHeader';
import ChartSelector from './statistics/ChartSelector';
import ChartFilters from './statistics/ChartFilters';
import YieldsCharts from './statistics/YieldsCharts';
import FinancialCharts from './statistics/FinancialCharts';
import EnvironmentalCharts from './statistics/EnvironmentalCharts';
import { useStatistics } from '../contexts/StatisticsContext';

const Statistics = () => {
  const { 
    period, 
    setPeriod, 
    cropFilter, 
    setCropFilter,
    updateDataWithFilters
  } = useStatistics();
  
  const [currentChart, setCurrentChart] = React.useState<'yields' | 'financial' | 'environmental'>('yields');
  
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

  const handleFilterChange = (newPeriod: any, newCropFilter: string) => {
    setPeriod(newPeriod);
    setCropFilter(newCropFilter);
    
    // Mettre à jour les données avec les nouveaux filtres
    updateDataWithFilters(newPeriod, newCropFilter);
  };
  
  return (
    <div className="p-6 animate-enter">
      <StatisticsHeader />

      <ChartSelector 
        currentChart={currentChart} 
        setCurrentChart={setCurrentChart} 
      />

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{getChartTitle()}</h2>
          <ChartFilters 
            period={period}
            setPeriod={(newPeriod) => handleFilterChange(newPeriod, cropFilter)}
            cropFilter={cropFilter}
            setCropFilter={(newCropFilter) => handleFilterChange(period, newCropFilter)}
          />
        </div>

        <p className="text-gray-500 mb-6">{getChartDescription()}</p>

        <div className="bg-gray-50 rounded-lg p-4">
          {currentChart === 'yields' && <YieldsCharts />}
          {currentChart === 'financial' && <FinancialCharts />}
          {currentChart === 'environmental' && <EnvironmentalCharts />}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
