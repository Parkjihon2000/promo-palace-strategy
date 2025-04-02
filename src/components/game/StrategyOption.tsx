
import React from 'react';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PriceStrategy = 'lower' | 'maintain' | 'raise';

interface StrategyOptionProps {
  strategy: PriceStrategy;
  selected: boolean;
  brand: 'brand1' | 'brand2';
  onSelect: () => void;
  disabled?: boolean;
}

const StrategyOption: React.FC<StrategyOptionProps> = ({
  strategy,
  selected,
  brand,
  onSelect,
  disabled = false
}) => {
  const getIcon = () => {
    switch (strategy) {
      case 'lower':
        return <ArrowDown className={cn("h-8 w-8", brand === 'brand1' ? "text-brand1" : "text-brand2")} />;
      case 'maintain':
        return <ArrowRight className={cn("h-8 w-8", brand === 'brand1' ? "text-brand1" : "text-brand2")} />;
      case 'raise':
        return <ArrowUp className={cn("h-8 w-8", brand === 'brand1' ? "text-brand1" : "text-brand2")} />;
    }
  };

  const getLabel = () => {
    switch (strategy) {
      case 'lower':
        return "Baisser les prix";
      case 'maintain':
        return "Maintenir les prix";
      case 'raise':
        return "Augmenter les prix";
    }
  };

  return (
    <div
      className={cn(
        "strategy-option", 
        brand,
        selected && "selected",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !disabled && onSelect()}
    >
      <div className="mb-2">{getIcon()}</div>
      <div className="text-sm font-medium">{getLabel()}</div>
    </div>
  );
};

export default StrategyOption;
