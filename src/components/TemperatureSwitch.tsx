import { Button } from '@mui/material';
import { useTemperatureUnit } from '../context/TemperatureUnitContext';

const TemperatureSwitch: React.FC = () => {
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <Button onClick={toggleUnit} variant='outlined'>
      Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
    </Button>
  );
};

export default TemperatureSwitch;
