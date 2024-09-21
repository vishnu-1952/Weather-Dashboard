import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTemperatureUnit } from '../context/TemperatureUnitContext'; // Use the context
import axios from 'axios';
import API_KEY from '../config/config';

interface WeatherWidgetProps {
  location: string;
  onRemove: () => void;
}

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  location,
  onRemove,
}) => {
  const { unit } = useTemperatureUnit(); // Get temperature unit from context
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );

        const data = response.data;
        setWeatherData({
          temperature: data.main.temp,
          condition: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data.');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (loading) return <Typography>Loading weather data...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  // Convert temperature if needed
  const displayTemperature =
    unit === 'F'
      ? (weatherData?.temperature ?? 0) * 1.8 + 32
      : weatherData?.temperature;

  return (
    <Card sx={{ position: 'relative' }}>
      <IconButton
        onClick={onRemove}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <CardContent>
        <Typography variant='h6'>{location}</Typography>
        <Typography variant='body2'>
          Temperature: {displayTemperature?.toFixed(1)}°{unit}
        </Typography>
        <Typography variant='body2'>
          Condition: {weatherData?.condition}
        </Typography>

        <Box display='flex' alignItems='center'>
          <img src={weatherData?.icon} alt={weatherData?.condition} />
          <Typography variant='body2' sx={{ marginLeft: 1 }}>
            {weatherData?.condition}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
