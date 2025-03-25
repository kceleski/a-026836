
import React from 'react';
import { EditableField } from '../ui/editable-field';

interface PageHeaderProps {
  title: string;
  description: string;
  onTitleChange: (value: string | number) => void;
  onDescriptionChange: (value: string | number) => void;
}

const PageHeader = ({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange 
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">
          <EditableField
            value={title}
            onSave={onTitleChange}
            className="inline-block"
          />
        </h1>
        <p className="text-muted-foreground">
          <EditableField
            value={description}
            onSave={onDescriptionChange}
            className="inline-block"
          />
        </p>
      </div>
    </header>
  );
};

export default PageHeader;
