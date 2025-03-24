
import React, { useState } from 'react';
import { EditableField } from './editable-field';
import { ChevronDown, Edit, Trash2, Plus } from 'lucide-react';

export interface Column {
  id: string;
  header: string;
  accessorKey: string;
  type?: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  isEditable?: boolean;
  width?: string;
}

interface EditableTableProps {
  data: Record<string, any>[];
  columns: Column[];
  onUpdate: (rowIndex: number, columnId: string, value: any) => void;
  onDelete?: (rowIndex: number) => void;
  onAdd?: (newRow: Record<string, any>) => void;
  className?: string;
  sortable?: boolean;
}

export const EditableTable = ({
  data,
  columns,
  onUpdate,
  onDelete,
  onAdd,
  className = '',
  sortable = true
}: EditableTableProps) => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    if (sortBy === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;
    
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' 
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1);
  });

  const handleAddRow = () => {
    if (onAdd) {
      const newRow = columns.reduce((acc, column) => {
        acc[column.accessorKey] = '';
        return acc;
      }, {} as Record<string, any>);
      
      onAdd(newRow);
    }
  };

  return (
    <div className={`bg-white rounded-xl border overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.id} 
                  className={`px-4 py-3 text-left ${column.width || ''}`}
                  style={{ width: column.width }}
                >
                  {sortable ? (
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort(column.accessorKey)}
                    >
                      {column.header}
                      {sortBy === column.accessorKey && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} 
                        />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {onDelete && <th className="px-4 py-3 text-left w-24">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-muted/30">
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.id}`} className="px-4 py-3">
                    {column.isEditable ? (
                      <EditableField
                        value={row[column.accessorKey]}
                        type={column.type as 'text' | 'number'}
                        onSave={(value) => onUpdate(rowIndex, column.accessorKey, value)}
                      />
                    ) : (
                      row[column.accessorKey]
                    )}
                  </td>
                ))}
                {onDelete && (
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => onDelete(rowIndex)}
                        className="p-1.5 hover:bg-agri-danger/10 text-agri-danger rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onDelete ? 1 : 0)} className="px-4 py-4 text-center text-muted-foreground">
                  Aucune donnée disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {onAdd && (
        <div className="p-4 border-t">
          <button 
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 text-sm bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une ligne
          </button>
        </div>
      )}
    </div>
  );
};
