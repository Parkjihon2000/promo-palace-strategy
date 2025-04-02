import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandDecision from '@/components/game/BrandDecision';
import PayoffMatrix from '@/components/game/PayoffMatrix';
import { PriceStrategy } from '@/components/game/StrategyOption';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import GameControls from '@/components/game/GameControls';
import HistoryTable from '@/components/game/HistoryTable';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Définition de la matrice des gains
const payoffMatrix = {
  lower: {
    lower: { brand1: 5000, brand2: 5000 },
    maintain: { brand1: 8000, brand2: 3000 },
    raise: { brand1: 10000, brand2: 2000 }
  },
  maintain: {
    lower: { brand1: 3000, brand2: 8000 },
    maintain: { brand1: 7000, brand2: 7000 },
    raise: { brand1: 9000, brand2: 5000 }
  },
  raise: {
    lower: { brand1: 2000, brand2: 10000 },
    maintain: { brand1: 5000, brand2: 9000 },
    raise: { brand1: 8000, brand2: 8000 }
  }
};

// Définition des équilibres de Nash
const nashEquilibria: Array<[PriceStrategy, PriceStrategy]> = [['maintain', 'maintain']];

interface HistoryEntry {
  round: number;
  brand1Strategy: PriceStrategy;
  brand2Strategy: PriceStrategy;
  profit1: number;
  profit2: number;
  marketShare1: number;
  marketShare2: number;
}

const Index = () => {
  const { toast } = useToast();
  const [brand1Strategy, setBrand1Strategy] = useState<PriceStrategy | null>(null);
  const [brand2Strategy, setBrand2Strategy] = useState<PriceStrategy | null>(null);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [results, setResults] = useState<{
    profit1: number;
    profit2: number;
    marketShare1: number;
    marketShare2: number;
  } | null>(null);

  const handlePlay = () => {
    if (!brand1Strategy || !brand2Strategy) return;

    // Calculer les résultats
    const profit1 = payoffMatrix[brand1Strategy][brand2Strategy].brand1;
    const profit2 = payoffMatrix[brand1Strategy][brand2Strategy].brand2;
    
    // Total market size
    const totalMarket = profit1 + profit2;
    const marketShare1 = profit1 / totalMarket;
    const marketShare2 = profit2 / totalMarket;

    // Mettre à jour les résultats
    const newResults = {
      profit1,
      profit2,
      marketShare1,
      marketShare2
    };
    setResults(newResults);

    // Ajouter à l'historique
    const historyEntry: HistoryEntry = {
      round,
      brand1Strategy,
      brand2Strategy,
      ...newResults
    };
    setHistory([...history, historyEntry]);

    // Vérifier s'il s'agit d'un équilibre de Nash
    const isNash = nashEquilibria.some(
      ([b1, b2]) => b1 === brand1Strategy && b2 === brand2Strategy
    );
    
    if (isNash) {
      toast({
        title: "Équilibre de Nash atteint !",
        description: "Les deux marques ont trouvé une stratégie optimale où aucune n'a intérêt à changer seule sa décision.",
        duration: 5000,
      });
    }

    // Mettre fin au tour
    setIsPlaying(false);
  };

  const handleReset = () => {
    setBrand1Strategy(null);
    setBrand2Strategy(null);
    setResults(null);
    setIsPlaying(true);
  };

  const handleNewRound = () => {
    setBrand1Strategy(null);
    setBrand2Strategy(null);
    setResults(null);
    setRound(round + 1);
    setIsPlaying(true);
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            onClick={openInNewTab} 
            className="flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Ouvrir en plein écran
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Stratégie Optimale pour les Promotions</CardTitle>
            <CardDescription className="text-lg">
              Simulation d'un jeu de compétition entre deux marques concurrentes dans un supermarché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-3xl mx-auto text-center mb-4">
              <p>
                Cette simulation illustre comment deux marques concurrentes décident de leurs stratégies de prix
                sans connaître les décisions de l'autre. C'est un exemple de jeu simultané en théorie des jeux.
              </p>
            </div>

            <GameControls
              onPlay={handlePlay}
              onReset={handleReset}
              isPlaying={isPlaying}
              round={round}
              brand1Strategy={brand1Strategy}
              brand2Strategy={brand2Strategy}
              disabled={false}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BrandDecision
            brandName="Marque A"
            brandColor="brand1"
            selectedStrategy={brand1Strategy}
            onSelectStrategy={setBrand1Strategy}
            isPlaying={isPlaying}
          />
          <BrandDecision
            brandName="Marque B"
            brandColor="brand2"
            selectedStrategy={brand2Strategy}
            onSelectStrategy={setBrand2Strategy}
            isPlaying={isPlaying}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-7">
            <ResultsDisplay
              brand1Strategy={brand1Strategy}
              brand2Strategy={brand2Strategy}
              brand1Name="Marque A"
              brand2Name="Marque B"
              results={results}
            />
          </div>
          <div className="md:col-span-5">
            <PayoffMatrix
              brand1Strategy={brand1Strategy}
              brand2Strategy={brand2Strategy}
              payoffs={payoffMatrix}
              nashEquilibria={nashEquilibria}
            />
          </div>
        </div>

        {history.length > 0 && (
          <div className="mb-6">
            <HistoryTable 
              history={history} 
              brand1Name="Marque A" 
              brand2Name="Marque B" 
            />
          </div>
        )}

        {!isPlaying && (
          <div className="flex justify-center">
            <button
              onClick={handleNewRound}
              className="px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all"
            >
              Tour suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
