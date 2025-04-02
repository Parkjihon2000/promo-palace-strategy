
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PriceStrategy } from './StrategyOption';

interface HistoryEntry {
  round: number;
  brand1Strategy: PriceStrategy;
  brand2Strategy: PriceStrategy;
  profit1: number;
  profit2: number;
  marketShare1: number;
  marketShare2: number;
}

interface HistoryTableProps {
  history: HistoryEntry[];
  brand1Name: string;
  brand2Name: string;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  history,
  brand1Name,
  brand2Name
}) => {
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

  const getStrategyLabel = (strategy: PriceStrategy) => {
    switch (strategy) {
      case 'lower': return 'Baisse';
      case 'maintain': return 'Maintien';
      case 'raise': return 'Hausse';
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historique des décisions</CardTitle>
        <CardDescription>
          Récapitulatif des tours précédents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Stratégie {brand1Name}</TableHead>
                <TableHead>Stratégie {brand2Name}</TableHead>
                <TableHead>Bénéfice {brand1Name}</TableHead>
                <TableHead>Part de marché {brand1Name}</TableHead>
                <TableHead>Bénéfice {brand2Name}</TableHead>
                <TableHead>Part de marché {brand2Name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.round}>
                  <TableCell>{entry.round}</TableCell>
                  <TableCell className="font-medium text-brand1">
                    {getStrategyLabel(entry.brand1Strategy)}
                  </TableCell>
                  <TableCell className="font-medium text-brand2">
                    {getStrategyLabel(entry.brand2Strategy)}
                  </TableCell>
                  <TableCell>{formatCurrency(entry.profit1)}</TableCell>
                  <TableCell>{formatPercentage(entry.marketShare1)}</TableCell>
                  <TableCell>{formatCurrency(entry.profit2)}</TableCell>
                  <TableCell>{formatPercentage(entry.marketShare2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
