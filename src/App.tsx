import React, { useEffect, useState } from 'react';
import { parseData, aggregateDataByYear, aggregateDataByCrop } from '../public/dataProcessor';
import DataTable from './pages/DataTable';
import rawData from '../public/data.json';
import { MantineProvider, Container, Grid } from '@mantine/core';
import { theme } from './theme';
import './App.css';

const App: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [cropData, setCropData] = useState<any[]>([]);

  useEffect(() => {
    const data = parseData(rawData);
    const yearlyAggregated = aggregateDataByYear(data);
    const cropAggregated = aggregateDataByCrop(data);
    setYearlyData(yearlyAggregated);
    setCropData(cropAggregated);
  }, []);

  // Define columns with display names
  const yearlyColumns = [
    { key: 'year', label: 'Year' },
    { key: 'maxProductionCrop', label: 'Crop with Maximum Production in that Year' },
    { key: 'minProductionCrop', label: 'Crop with Minimum Production in that Year' },
  ];

  const cropColumns = [
    { key: 'crop', label: 'Crop' },
    { key: 'avgYield', label: 'Average Yield of the Crop between 1950-2020' },
    { key: 'avgCultivationArea', label: 'Average Cultivation Area of the Crop between 1950-2020' },
  ];

  return (
    <MantineProvider theme={theme}>
      <div className='app'>
        <Container>
          <Grid>
            <Grid.Col span={6}>
              <h1>Yearly Crops Data</h1>
              <DataTable data={yearlyData} columns={yearlyColumns} />
            </Grid.Col>
            <Grid.Col span={6}>
              <h1>Crops Statistics</h1>
              <DataTable data={cropData} columns={cropColumns} />
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </MantineProvider>
  );
};

export default App;
