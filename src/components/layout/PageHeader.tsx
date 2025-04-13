
import React from 'react';
import { EditableField } from '../ui/editable-field';
import { Button } from '../ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  onTitleChange: (value: string | number) => void;
  onDescriptionChange: (value: string | number) => void;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange,
  actions,
  className = ''
}: PageHeaderProps) => {
  return (
    <header className={`flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold mb-1 animate-enter">
          <EditableField
            value={title}
            onSave={onTitleChange}
            className="inline-block"
            showEditIcon
          />
        </h1>
        <p className="text-muted-foreground">
          <EditableField
            value={description}
            onSave={onDescriptionChange}
            className="inline-block"
            showEditIcon
          />
        </p>
      </div>
      
      {actions && (
        <div className="flex flex-wrap items-center gap-2 animate-enter">
          {actions}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
