
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceStrategy } from './StrategyOption';
import { ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';

interface ResultsDisplayProps {
  brand1Strategy: PriceStrategy | null;
  brand2Strategy: PriceStrategy | null;
  brand1Name: string;
  brand2Name: string;
  results: {
    profit1: number;
    profit2: number;
    marketShare1: number;
    marketShare2: number;
  } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  brand1Strategy,
  brand2Strategy,
  brand1Name,
  brand2Name,
  results
}) => {
  if (!brand1Strategy || !brand2Strategy || !results) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Résultats</CardTitle>
          <CardDescription>
            Choisissez une stratégie pour chaque marque pour voir les résultats
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  };

  const getStrategyDescription = (strategy: PriceStrategy) => {
    switch (strategy) {
      case 'lower':
        return "a baissé ses prix";
      case 'maintain':
        return "a maintenu ses prix";
      case 'raise':
        return "a augmenté ses prix";
    }
  };

  const getProfitIcon = (strategy: PriceStrategy, otherStrategy: PriceStrategy) => {
    // Simple logic for profit trend based on strategies
    if (strategy === 'lower' && otherStrategy !== 'lower') {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    } else if (strategy === 'raise' && otherStrategy !== 'raise') {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    } else if (strategy === 'lower' && otherStrategy === 'lower') {
      return <TrendingDown className="h-5 w-5 text-red-500" />;
    } else if (strategy === 'raise' && otherStrategy === 'lower') {
      return <TrendingDown className="h-5 w-5 text-red-500" />;
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Résultats de la simulation</CardTitle>
        <CardDescription>
          Impact des décisions de prix sur les bénéfices et parts de marché
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-center mb-4">
              <span className="font-semibold text-brand1">{brand1Name}</span> {getStrategyDescription(brand1Strategy)} et{' '}
              <span className="font-semibold text-brand2">{brand2Name}</span> {getStrategyDescription(brand2Strategy)}.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand 1 Results */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-brand1">{brand1Name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-muted-foreground">Bénéfice</div>
                      {getProfitIcon(brand1Strategy, brand2Strategy)}
                    </div>
                    <div className="text-2xl font-bold text-brand1">{formatCurrency(results.profit1)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Part de marché</div>
                    <div className="text-2xl font-bold text-brand1">{formatPercentage(results.marketShare1)}</div>
                  </div>
                </div>
              </div>

              {/* Brand 2 Results */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-brand2">{brand2Name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-muted-foreground">Bénéfice</div>
                      {getProfitIcon(brand2Strategy, brand1Strategy)}
                    </div>
                    <div className="text-2xl font-bold text-brand2">{formatCurrency(results.profit2)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Part de marché</div>
                    <div className="text-2xl font-bold text-brand2">{formatPercentage(results.marketShare2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
