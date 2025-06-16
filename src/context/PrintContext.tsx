import { createContext, useState, ReactNode } from 'react';

interface Analysis {
  volume: number;
  area: number;
}

interface Quote {
  cost: number;
  time: number;
}

interface Context {
  analysis: Analysis;
  quote: Quote;
  setAnalysis: (a: Analysis) => void;
  setQuote: (q: Quote) => void;
}

const defaultAnalysis: Analysis = { volume: 0, area: 0 };
const defaultQuote: Quote = { cost: 0, time: 0 };

export const PrintContext = createContext<Context>({
  analysis: defaultAnalysis,
  quote: defaultQuote,
  setAnalysis: () => {},
  setQuote: () => {}
});

export function PrintProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<Analysis>(defaultAnalysis);
  const [quote, setQuote] = useState<Quote>(defaultQuote);

  return (
    <PrintContext.Provider value={{ analysis, quote, setAnalysis, setQuote }}>
      {children}
    </PrintContext.Provider>
  );
}
