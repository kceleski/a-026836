
import React from 'react';
import { Calendar, Filter, RefreshCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ChartFiltersProps {
  period: string;
  setPeriod: (period: string) => void;
  cropFilter: string;
  setCropFilter: (filter: string) => void;
}

const ChartFilters = ({ period, setPeriod, cropFilter, setCropFilter }: ChartFiltersProps) => {
  const handleResetFilters = () => {
    setPeriod('year');
    setCropFilter('all');
    toast.info("Filtres réinitialisés", {
      description: "Affichage de toutes les cultures sur une période annuelle"
    });
  };
  
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select 
        value={period}
        onValueChange={(value) => setPeriod(value)}
      >
        <SelectTrigger className="w-[140px]">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <SelectValue placeholder="Période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="year">Annuel</SelectItem>
          <SelectItem value="month">Mensuel</SelectItem>
          <SelectItem value="week">Hebdomadaire</SelectItem>
          <SelectItem value="day">Journalier</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={cropFilter}
        onValueChange={(value) => setCropFilter(value)}
      >
        <SelectTrigger className="w-[160px]">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <SelectValue placeholder="Culture" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes cultures</SelectItem>
          <SelectItem value="Canne à Sucre">Canne à Sucre</SelectItem>
          <SelectItem value="Banane">Banane</SelectItem>
          <SelectItem value="Ananas">Ananas</SelectItem>
          <SelectItem value="Igname">Igname</SelectItem>
          <SelectItem value="Madère">Madère</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleResetFilters}
        className="flex items-center gap-1"
      >
        <RefreshCcw className="h-3.5 w-3.5" />
        Réinitialiser
      </Button>
    </div>
  );
};

export default ChartFilters;
