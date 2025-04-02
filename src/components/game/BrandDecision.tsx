
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StrategyOption, { PriceStrategy } from '@/components/game/StrategyOption';

interface BrandDecisionProps {
  brandName: string;
  brandColor: 'brand1' | 'brand2';
  selectedStrategy: PriceStrategy | null;
  onSelectStrategy: (strategy: PriceStrategy) => void;
  isPlaying: boolean;
}

const BrandDecision: React.FC<BrandDecisionProps> = ({
  brandName,
  brandColor,
  selectedStrategy,
  onSelectStrategy,
  isPlaying
}) => {
  return (
    <Card className="w-full">
      <CardHeader className={brandColor === 'brand1' ? 'brand1-bg text-white' : 'brand2-bg text-white'}>
        <CardTitle>{brandName}</CardTitle>
        <CardDescription className="text-white/80">
          Choisissez votre stratégie de prix
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4">
          <StrategyOption 
            strategy="lower" 
            selected={selectedStrategy === 'lower'} 
            brand={brandColor}
            onSelect={() => onSelectStrategy('lower')}
            disabled={!isPlaying}
          />
          <StrategyOption 
            strategy="maintain" 
            selected={selectedStrategy === 'maintain'} 
            brand={brandColor}
            onSelect={() => onSelectStrategy('maintain')}
            disabled={!isPlaying}
          />
          <StrategyOption 
            strategy="raise" 
            selected={selectedStrategy === 'raise'} 
            brand={brandColor}
            onSelect={() => onSelectStrategy('raise')}
            disabled={!isPlaying}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandDecision;
