
import React from 'react';
import { Button } from '@/components/ui/button';
import { PriceStrategy } from './StrategyOption';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface GameControlsProps {
  onPlay: () => void;
  onReset: () => void;
  isPlaying: boolean;
  round: number;
  brand1Strategy: PriceStrategy | null;
  brand2Strategy: PriceStrategy | null;
  disabled: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onPlay,
  onReset,
  isPlaying,
  round,
  brand1Strategy,
  brand2Strategy,
  disabled
}) => {
  const canPlay = isPlaying && brand1Strategy !== null && brand2Strategy !== null;
  
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="font-medium">Tour: {round}</div>
        {isPlaying ? (
          <div className="text-muted-foreground">
            {(!brand1Strategy || !brand2Strategy) ? 
              'Choisissez une stratégie pour chaque marque' : 
              'Prêt à simuler la décision'}
          </div>
        ) : (
          <div className="text-muted-foreground">Tour terminé</div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={disabled}>
              Réinitialiser
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Réinitialiser la simulation?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action va réinitialiser la partie et effacer tous les résultats actuels.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onReset}>Réinitialiser</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button 
          onClick={onPlay} 
          disabled={!canPlay || disabled}
        >
          {isPlaying ? 'Exécuter les décisions' : 'Tour suivant'}
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
