import { useContext } from 'react';
import { PrintContext } from '../context/PrintContext';

const densityMap: Record<string, number> = {
  PLA: 1.24,
  ABS: 1.04,
  PETG: 1.27
};

export function usePrintQuote() {
  const { analysis, quote, setAnalysis, setQuote } = useContext(PrintContext);

  const updateVolume = (volume: number) => {
    setAnalysis({ ...analysis, volume });
  };

  const calculate = (data: {
    material: string;
    pricePerKg: number;
    infill: number;
    layerHeight: number;
    speed: number;
    overhead: number;
  }) => {
    const density = densityMap[data.material] || 1;
    const weight = (analysis.volume * density * (data.infill / 100)) / 1000; // kg
    const time = (data.layerHeight * analysis.volume) / (data.speed * 60);
    const cost = weight * data.pricePerKg * (1 + data.overhead / 100);
    setQuote({ cost, time });
  };

  return { analysis, quote, updateVolume, calculate };
}
