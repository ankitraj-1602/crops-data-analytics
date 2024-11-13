interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare)": number;
    "Area Under Cultivation (UOM:Ha(Hectares))": number;
  }
  
  interface AggregatedData {
    year: string;
    maxProductionCrop: string;
    minProductionCrop: string;
  }
  
  interface CropStats {
    crop: string;
    avgYield: number;
    avgCultivationArea: number;
  }
  
  const parseData = (data: any[]): CropData[] => {
    return data.map((entry) => (
      {
      Country: entry.Country,
      Year: entry.Year.split(',')[1],
      "Crop Name": entry["Crop Name"],
      "Crop Production (UOM:t(Tonnes))": Number(entry["Crop Production (UOM:t(Tonnes))"]) || 0,
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare)": Number(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
      "Area Under Cultivation (UOM:Ha(Hectares))": Number(entry["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
    }));
  };
  
  const aggregateDataByYear = (data: CropData[]): AggregatedData[] => {
    const yearMap: { [year: string]: { max: CropData; min: CropData } } = {};
  
    data.forEach((entry) => {
      const year = entry.Year;
      if (!yearMap[year]) {
        yearMap[year] = { max: entry, min: entry };
      } else {
        if (entry["Crop Production (UOM:t(Tonnes))"] > yearMap[year].max["Crop Production (UOM:t(Tonnes))"]) {
          yearMap[year].max = entry;
        }
        if (entry["Crop Production (UOM:t(Tonnes))"] < yearMap[year].min["Crop Production (UOM:t(Tonnes))"]) {
          yearMap[year].min = entry;
        }
      }
    });
  
    return Object.entries(yearMap).map(([year, { max, min }]) => ({
      year,
      maxProductionCrop: max["Crop Name"],
      minProductionCrop: min["Crop Name"],
    }));
  };
  
  const aggregateDataByCrop = (data: CropData[]): CropStats[] => {
    const cropMap: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};
    data.forEach((entry) => {
        const crop = entry["Crop Name"];
        if (!cropMap[crop]) {
          cropMap[crop] = {
            totalYield: entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare)"],  
            totalArea: entry["Area Under Cultivation (UOM:Ha(Hectares))"],       
            count: 1,
          };
        } else {
          cropMap[crop].totalYield += entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare)"]; 
          cropMap[crop].totalArea += entry["Area Under Cultivation (UOM:Ha(Hectares))"];      
          cropMap[crop].count += 1;
        }
      });
  
    return Object.entries(cropMap).map(([crop, { totalYield, totalArea, count }]) => ({
      crop,
      avgYield: parseFloat((totalYield / count).toFixed(3)),
      avgCultivationArea: parseFloat((totalArea / count).toFixed(3)),
    }));
  };
  
  export { parseData, aggregateDataByYear, aggregateDataByCrop };
  