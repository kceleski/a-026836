
import React, { useState } from 'react';
import StatisticsHeader from './statistics/StatisticsHeader';
import ChartSelector from './statistics/ChartSelector';
import ChartFilters from './statistics/ChartFilters';
import YieldsCharts from './statistics/YieldsCharts';
import FinancialCharts from './statistics/FinancialCharts';
import EnvironmentalCharts from './statistics/EnvironmentalCharts';

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
      <StatisticsHeader />

      <ChartSelector 
        currentChart={currentChart} 
        setCurrentChart={setCurrentChart} 
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{getChartTitle()}</h2>
        <ChartFilters 
          period={period}
          setPeriod={setPeriod}
          cropFilter={cropFilter}
          setCropFilter={setCropFilter}
        />
      </div>

      <p className="text-muted-foreground mb-6">{getChartDescription()}</p>

      {currentChart === 'yields' && <YieldsCharts />}
      {currentChart === 'financial' && <FinancialCharts />}
      {currentChart === 'environmental' && <EnvironmentalCharts />}
    </div>
  );
};

export default Statistics;
