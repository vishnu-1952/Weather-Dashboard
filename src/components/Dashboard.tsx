import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import WeatherWidget from './WeatherWidget';
import TemperatureSwitch from './TemperatureSwitch';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<number[]>(() => {
    const saved = localStorage.getItem('weatherWidgets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = () => {
    setWidgets([...widgets, widgets.length]);
  };

  const removeWidget = (id: number) => {
    setWidgets(widgets.filter((widget) => widget !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5'>Weather Dashboard</Typography>
        <Box display='flex' alignItems='center'>
          <TemperatureSwitch />
          <Button
            variant='contained'
            onClick={addWidget}
            sx={{ marginLeft: 2 }}
          >
            Add Widget
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {widgets.map((id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <WeatherWidget
              location='New York'
              onRemove={() => removeWidget(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
