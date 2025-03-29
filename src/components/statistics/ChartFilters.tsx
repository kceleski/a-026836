
import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface ChartFiltersProps {
  period: string;
  setPeriod: (period: string) => void;
  cropFilter: string;
  setCropFilter: (filter: string) => void;
}

const ChartFilters = ({ period, setPeriod, cropFilter, setCropFilter }: ChartFiltersProps) => {
  return (
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
  );
};

export default ChartFilters;
