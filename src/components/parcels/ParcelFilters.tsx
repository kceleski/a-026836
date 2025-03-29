
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';

interface ParcelFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const ParcelFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  onSearch
}: ParcelFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <form onSubmit={onSearch} className="flex">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Rechercher une parcelle..."
            className="pl-9 w-full md:w-48"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="active">Parcelles actives</SelectItem>
          <SelectItem value="fallow">En jachère</SelectItem>
          <SelectItem value="planned">Planifiées</SelectItem>
          <SelectItem value="rented">Louées</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          <SelectItem value="field">Champs</SelectItem>
          <SelectItem value="greenhouse">Serres</SelectItem>
          <SelectItem value="orchard">Vergers</SelectItem>
          <SelectItem value="experimental">Expérimentales</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ParcelFilters;
