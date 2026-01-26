import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CalculationInputs, BandConfiguration, CalculationResult } from '../types';
import { calculateExposure } from '../utils/calculations';

type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  inputs: CalculationInputs;
  setInputs: (inputs: CalculationInputs) => void;
  updateInput: <K extends keyof CalculationInputs>(key: K, value: CalculationInputs[K]) => void;
  result: CalculationResult | null;
  multiBandConfigs: BandConfiguration[];
  addBandConfig: () => void;
  removeBandConfig: (id: string) => void;
  updateBandConfig: (id: string, inputs: Partial<CalculationInputs>) => void;
  showMultiBand: boolean;
  setShowMultiBand: (show: boolean) => void;
  resetInputs: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'strahlblick-theme';
const INPUTS_STORAGE_KEY = 'strahlblick-inputs';

const DEFAULT_INPUTS: CalculationInputs = {
  transmitPower: 100,
  dutyCycle: 40,
  frequency: 14.175,
  antennaGain: 2.15,
  feedlineLoss: 1,
  antennaHeight: 10,
  evaluationDistance: 3,
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Input state
  const [inputs, setInputsState] = useState<CalculationInputs>(() => {
    const saved = localStorage.getItem(INPUTS_STORAGE_KEY);
    if (saved) {
      try {
        return { ...DEFAULT_INPUTS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_INPUTS;
      }
    }
    return DEFAULT_INPUTS;
  });

  // Multi-band configurations
  const [multiBandConfigs, setMultiBandConfigs] = useState<BandConfiguration[]>([]);
  const [showMultiBand, setShowMultiBand] = useState(false);

  // Calculate result whenever inputs change
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const newResult = calculateExposure(inputs);
    setResult(newResult);
  }, [inputs]);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Save inputs to localStorage
  useEffect(() => {
    localStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(inputs));
  }, [inputs]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setInputs = useCallback((newInputs: CalculationInputs) => {
    setInputsState(newInputs);
  }, []);

  const updateInput = useCallback(<K extends keyof CalculationInputs>(
    key: K,
    value: CalculationInputs[K]
  ) => {
    setInputsState(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetInputs = useCallback(() => {
    setInputsState(DEFAULT_INPUTS);
  }, []);

  // Multi-band functions
  const addBandConfig = useCallback(() => {
    const newConfig: BandConfiguration = {
      id: generateId(),
      inputs: { ...DEFAULT_INPUTS },
      result: null
    };
    setMultiBandConfigs(prev => [...prev, newConfig]);
  }, []);

  const removeBandConfig = useCallback((id: string) => {
    setMultiBandConfigs(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateBandConfig = useCallback((id: string, inputUpdates: Partial<CalculationInputs>) => {
    setMultiBandConfigs(prev => prev.map(config => {
      if (config.id !== id) return config;
      const newInputs = { ...config.inputs, ...inputUpdates };
      const newResult = calculateExposure(newInputs);
      return { ...config, inputs: newInputs, result: newResult };
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        inputs,
        setInputs,
        updateInput,
        result,
        multiBandConfigs,
        addBandConfig,
        removeBandConfig,
        updateBandConfig,
        showMultiBand,
        setShowMultiBand,
        resetInputs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
