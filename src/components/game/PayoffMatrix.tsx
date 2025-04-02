
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceStrategy } from '@/components/game/StrategyOption';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PayoffMatrixProps {
  brand1Strategy: PriceStrategy | null;
  brand2Strategy: PriceStrategy | null;
  payoffs: {
    [key in PriceStrategy]: {
      [key in PriceStrategy]: {
        brand1: number;
        brand2: number;
      };
    };
  };
  showNash?: boolean;
  nashEquilibria?: Array<[PriceStrategy, PriceStrategy]>;
}

const PayoffMatrix: React.FC<PayoffMatrixProps> = ({
  brand1Strategy,
  brand2Strategy,
  payoffs,
  showNash = true,
  nashEquilibria = []
}) => {
  const strategies: PriceStrategy[] = ['lower', 'maintain', 'raise'];
  
  const isNashEquilibrium = (brand1: PriceStrategy, brand2: PriceStrategy) => {
    return nashEquilibria.some(([b1, b2]) => b1 === brand1 && b2 === brand2);
  };

  const formatPayoff = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const strategyLabel = (strategy: PriceStrategy) => {
    switch (strategy) {
      case 'lower':
        return "Baisser";
      case 'maintain':
        return "Maintenir";
      case 'raise':
        return "Augmenter";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Matrice des gains</CardTitle>
          {showNash && nashEquilibria.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-ring"></div>
                      Équilibre de Nash
                    </Badge>
                    <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Un Équilibre de Nash est une situation où aucun joueur ne peut améliorer son résultat
                    en changeant uniquement sa propre stratégie.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <CardDescription>
          Bénéfices par marque selon les stratégies choisies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2"></th>
                <th className="p-2"></th>
                <th className="p-2 text-center font-medium text-muted-foreground" colSpan={3}>
                  Marque 2
                </th>
              </tr>
              <tr>
                <th className="p-2"></th>
                <th className="p-2"></th>
                {strategies.map((strategy) => (
                  <th key={strategy} className="p-2 text-center font-medium text-brand2">
                    {strategyLabel(strategy)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-2 text-center font-medium text-muted-foreground" rowSpan={3}>
                  <div className="transform -rotate-90">Marque 1</div>
                </th>
                <th className="p-2 text-center font-medium text-brand1">
                  {strategyLabel('lower')}
                </th>
                {strategies.map((brand2Strategy) => (
                  <td
                    key={`lower-${brand2Strategy}`}
                    className={cn(
                      "matrix-cell text-center",
                      isNashEquilibrium('lower', brand2Strategy) && "nash",
                      brand1Strategy === 'lower' && brand2Strategy === brand2Strategy && "bg-muted"
                    )}
                  >
                    <div className="font-medium text-brand1">
                      {formatPayoff(payoffs.lower[brand2Strategy].brand1)}
                    </div>
                    <div className="font-medium text-brand2">
                      {formatPayoff(payoffs.lower[brand2Strategy].brand2)}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="p-2 text-center font-medium text-brand1">
                  {strategyLabel('maintain')}
                </th>
                {strategies.map((brand2Strategy) => (
                  <td
                    key={`maintain-${brand2Strategy}`}
                    className={cn(
                      "matrix-cell text-center",
                      isNashEquilibrium('maintain', brand2Strategy) && "nash",
                      brand1Strategy === 'maintain' && brand2Strategy === brand2Strategy && "bg-muted"
                    )}
                  >
                    <div className="font-medium text-brand1">
                      {formatPayoff(payoffs.maintain[brand2Strategy].brand1)}
                    </div>
                    <div className="font-medium text-brand2">
                      {formatPayoff(payoffs.maintain[brand2Strategy].brand2)}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="p-2 text-center font-medium text-brand1">
                  {strategyLabel('raise')}
                </th>
                {strategies.map((brand2Strategy) => (
                  <td
                    key={`raise-${brand2Strategy}`}
                    className={cn(
                      "matrix-cell text-center",
                      isNashEquilibrium('raise', brand2Strategy) && "nash",
                      brand1Strategy === 'raise' && brand2Strategy === brand2Strategy && "bg-muted"
                    )}
                  >
                    <div className="font-medium text-brand1">
                      {formatPayoff(payoffs.raise[brand2Strategy].brand1)}
                    </div>
                    <div className="font-medium text-brand2">
                      {formatPayoff(payoffs.raise[brand2Strategy].brand2)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoffMatrix;
