import React from 'react';
import Dashboard from './components/Dashboard';
import { TemperatureUnitProvider } from './context/TemperatureUnitContext';

const App: React.FC = () => {
  return (
    <TemperatureUnitProvider>
      <div style={{ padding: '20px' }}>
        <Dashboard />
      </div>
    </TemperatureUnitProvider>
  );
};

export default App;
