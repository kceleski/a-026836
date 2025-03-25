
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabContainerProps {
  tabs: TabItem[];
  defaultValue: string;
  className?: string;
}

const TabContainer = ({ tabs, defaultValue, className = "mb-6" }: TabContainerProps) => {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList className="w-full md:w-auto grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabContainer;
