const generateGrid = () => {
  const grids = [];
  let id = 1;

  // Generate 5000 random points for an organic heatmap
  for (let i = 0; i < 5000; i++) {
    const lat = 24.600 + Math.random() * 0.400;
    const lng = 93.650 + Math.random() * 0.400;
      
      // Create some hotspots
      const distToHotspot1 = Math.sqrt(Math.pow(lat - 24.817, 2) + Math.pow(lng - 93.936, 2));
      const distToHotspot2 = Math.sqrt(Math.pow(lat - 24.805, 2) + Math.pow(lng - 93.900, 2));
      const distToHotspot3 = Math.sqrt(Math.pow(lat - 24.750, 2) + Math.pow(lng - 93.750, 2));
      const distToHotspot4 = Math.sqrt(Math.pow(lat - 24.850, 2) + Math.pow(lng - 93.850, 2));
      const distToHotspot5 = Math.sqrt(Math.pow(lat - 24.950, 2) + Math.pow(lng - 93.750, 2));
      
      let baseRisk = 10;
      if (distToHotspot1 < 0.08) baseRisk += (0.08 - distToHotspot1) * 1200;
      if (distToHotspot2 < 0.06) baseRisk += (0.06 - distToHotspot2) * 1500;
      if (distToHotspot3 < 0.07) baseRisk += (0.07 - distToHotspot3) * 1000;
      if (distToHotspot4 < 0.05) baseRisk += (0.05 - distToHotspot4) * 1800;
      if (distToHotspot5 < 0.09) baseRisk += (0.09 - distToHotspot5) * 900;
      
      const riskScore = Math.min(100, Math.max(0, baseRisk + (Math.random() * 20 - 10)));
      
      grids.push({
        id: id++,
        lat: lat,
        lng: lng,
        riskScore: Math.round(riskScore),
        slope: Math.round(10 + Math.random() * 40),
        moisture: Math.round(40 + Math.random() * 50),
        soilType: riskScore > 75 ? "Clay Loam" : "Sandy Clay",
        shap: { 
          rainfall: Number((Math.random() * 0.5 + 0.1).toFixed(2)), 
          slope: Number((Math.random() * 0.4 + 0.1).toFixed(2)), 
          moisture: Number((Math.random() * 0.3).toFixed(2)) 
        },
      });
  }
  return grids;
};

export const mockRiskGrids = generateGrid();

export const mockInSARPoints = [
  { id: 1, lat: 24.815, lng: 93.930, subsidence: -12.5 },
  { id: 2, lat: 24.800, lng: 93.890, subsidence: -18.2 },
  { id: 3, lat: 24.780, lng: 93.840, subsidence: -5.0 },
  { id: 4, lat: 24.760, lng: 93.780, subsidence: -8.7 },
];

export const mockIoTSensors = [
  { id: "SN-01", lat: 24.817, lng: 93.936, battery: 85, tilt: 4.2, moisture: 78, vibration: 0.05, status: "WARNING" },
  { id: "SN-02", lat: 24.805, lng: 93.900, battery: 42, tilt: 8.5, moisture: 88, vibration: 0.12, status: "CRITICAL" },
  { id: "SN-03", lat: 24.790, lng: 93.850, battery: 92, tilt: 1.1, moisture: 50, vibration: 0.01, status: "NORMAL" },
  { id: "SN-04", lat: 24.750, lng: 93.750, battery: 78, tilt: 3.5, moisture: 70, vibration: 0.03, status: "WARNING" },
];

export const mockRoadCorridors = [
  {
    id: "NH-37-SEG1",
    name: "NH-37 (Imphal-Jiribam) Seg 1",
    status: "AT RISK",
    coordinates: [[24.817, 93.936], [24.805, 93.900]]
  },
  {
    id: "NH-37-SEG2",
    name: "NH-37 (Imphal-Jiribam) Seg 2",
    status: "CLEAR",
    coordinates: [[24.805, 93.900], [24.790, 93.850]]
  },
  {
    id: "NH-10-SEG1",
    name: "NH-10 Seg 1",
    status: "CLEAR",
    coordinates: [[24.770, 93.810], [24.750, 93.750]]
  }
];

export const mockRainfallData = [
  { day: "Mon", rainfall: 12 },
  { day: "Tue", rainfall: 18 },
  { day: "Wed", rainfall: 45 },
  { day: "Thu", rainfall: 85 },
  { day: "Fri", rainfall: 120 },
  { day: "Sat", rainfall: 90 },
  { day: "Sun", rainfall: 65 },
];
