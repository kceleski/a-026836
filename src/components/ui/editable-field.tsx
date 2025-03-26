
import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface EditableFieldProps {
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number';
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const EditableField = ({
  value,
  onSave,
  type = 'text',
  className = '',
  inputClassName = '',
  placeholder = 'Entrer une valeur...',
  onClick
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Update the input value when the passed value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    // For number type, convert string to number
    const processedValue = type === 'number' ? 
      (inputValue === '' ? 0 : Number(inputValue)) : 
      inputValue;
    
    onSave(processedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <input
          ref={inputRef}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`px-2 py-1 border rounded-md focus:ring-1 focus:ring-primary focus:outline-none ${inputClassName}`}
          placeholder={placeholder}
        />
        <div className="flex items-center">
          <button 
            onClick={handleSave} 
            className="p-1 text-agri-success hover:bg-agri-success/10 rounded-full"
          >
            <Check className="h-4 w-4" />
          </button>
          <button 
            onClick={handleCancel} 
            className="p-1 text-agri-danger hover:bg-agri-danger/10 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`cursor-pointer hover:bg-muted/30 px-2 py-1 rounded ${className}`}
      onClick={handleClick}
    >
      {value || <span className="text-muted-foreground italic">{placeholder}</span>}
    </div>
  );
};
