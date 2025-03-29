
import React from 'react';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

interface ChartSelectorProps {
  currentChart: 'yields' | 'financial' | 'environmental';
  setCurrentChart: (chart: 'yields' | 'financial' | 'environmental') => void;
}

const ChartSelector = ({ currentChart, setCurrentChart }: ChartSelectorProps) => {
  return (
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
  );
};

export default ChartSelector;
