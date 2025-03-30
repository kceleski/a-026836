
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabContainerProps {
  tabs: TabItem[];
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

const TabContainer = ({ tabs, defaultValue, onValueChange }: TabContainerProps) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className="w-full">
      <TabsList className="mb-6">
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className="animate-fade-in">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabContainer;
