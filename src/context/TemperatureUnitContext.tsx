import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define type for temperature unit context
interface TemperatureUnitContextType {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

// Create the context with default value as Celsius
const TemperatureUnitContext = createContext<TemperatureUnitContextType>({
  unit: 'C',
  toggleUnit: () => {},
});

export const useTemperatureUnit = () => useContext(TemperatureUnitContext);

// Create provider component
export const TemperatureUnitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
};
