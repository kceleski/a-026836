
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import ParcelMap from '@/components/ParcelMap';

interface ParcelMapDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ParcelMapDialog = ({ isOpen, onOpenChange }: ParcelMapDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Carte des parcelles</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            <ParcelMap 
              coordinates={{ lat: 45.4631, lng: 4.3873 }}
              parcelName="Vue d'ensemble"
              isEditing={false}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Cette vue d'ensemble montre l'emplacement de toutes vos parcelles. 
            Cliquez sur une parcelle spécifique pour voir plus de détails.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelMapDialog;
