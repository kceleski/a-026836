
import React from 'react';
import { Link } from 'react-router-dom';
import StatisticsHeader from './statistics/StatisticsHeader';
import ChartSelector from './statistics/ChartSelector';
import ChartFilters from './statistics/ChartFilters';
import YieldsCharts from './statistics/YieldsCharts';
import FinancialCharts from './statistics/FinancialCharts';
import EnvironmentalCharts from './statistics/EnvironmentalCharts';
import { useStatistics } from '../contexts/StatisticsContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText, Printer } from 'lucide-react';
import { Button } from './ui/button';
import PreviewPrintButton from './common/PreviewPrintButton';

const Statistics = () => {
  const { 
    period, 
    setPeriod, 
    cropFilter, 
    setCropFilter,
    updateDataWithFilters,
    yieldData,
    financialData,
    environmentalData
  } = useStatistics();
  
  const isMobile = useIsMobile();
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
    updateDataWithFilters(newPeriod, newCropFilter);
  };
  
  // Get the current chart data based on the active chart
  const getCurrentChartData = () => {
    switch (currentChart) {
      case 'yields':
        return yieldData;
      case 'financial':
        return financialData.profitabilityByParcel;
      case 'environmental':
        return environmentalData.indicators;
      default:
        return [];
    }
  };
  
  // Get columns for the current chart
  const getChartColumns = () => {
    switch (currentChart) {
      case 'yields':
        return [
          { key: "name", header: "Culture" },
          { key: "current", header: "Rendement actuel" },
          { key: "previous", header: "Rendement précédent" },
          { key: "unit", header: "Unité" }
        ];
      case 'financial':
        return [
          { key: "name", header: "Parcelle" },
          { key: "profitability", header: "Rentabilité (€)" },
          { key: "size", header: "Surface (ha)" },
          { key: "crop", header: "Culture" }
        ];
      case 'environmental':
        return [
          { key: "indicator", header: "Indicateur" },
          { key: "current", header: "Valeur actuelle" },
          { key: "target", header: "Objectif" },
          { key: "trend", header: "Tendance" },
          { key: "status", header: "Statut" }
        ];
      default:
        return [];
    }
  };
  
  // Handle export for the chart filters
  const handleExportData = async () => {
    console.log(`Exportation des données ${currentChart} en cours...`);
  };
  
  return (
    <div className="p-3 md:p-6 animate-enter">
      <StatisticsHeader />

      <ChartSelector 
        currentChart={currentChart} 
        setCurrentChart={setCurrentChart} 
      />

      <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{getChartTitle()}</h2>
          
          <div className="flex items-center gap-2">
            <ChartFilters 
              period={period}
              setPeriod={(newPeriod) => handleFilterChange(newPeriod, cropFilter)}
              cropFilter={cropFilter}
              setCropFilter={(newCropFilter) => handleFilterChange(period, newCropFilter)}
              onExport={handleExportData}
            />
            
            <PreviewPrintButton
              data={getCurrentChartData()}
              moduleName={`statistics-${currentChart}`}
              title={getChartTitle()}
              columns={getChartColumns()}
              className="bg-white border-gray-200 hover:bg-gray-50 text-xs md:text-sm h-auto py-1.5 md:py-2"
              variant="outline"
            />
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">{getChartDescription()}</p>

        <div className="bg-gray-50 rounded-lg p-2 md:p-4 overflow-x-auto">
          <div className={`min-w-full ${isMobile ? 'min-w-[500px]' : ''}`}>
            {currentChart === 'yields' && <YieldsCharts />}
            {currentChart === 'financial' && <FinancialCharts />}
            {currentChart === 'environmental' && <EnvironmentalCharts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
