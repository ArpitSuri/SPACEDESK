const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Sample data import
const sampleData = require('./sample_telemetry.json');

// Configuration
const Z_SCORE_THRESHOLD = 2.5;
const WINDOW_SIZE = 10;
const MAX_DATA_POINTS = 100;

// Initialize telemetry storage
let telemetryData = [...sampleData];
let currentIndex = 0;
let simulationRunning = false;

// Data generation and analysis functions
function generateTelemetry() {
  let value = 100 + (Math.random() * 5 - 2.5);
  if (Math.random() < 0.05) {
    value = value * (0.7 + Math.random() * 0.6);
  }
  return {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    power: parseFloat(value.toFixed(2)),
    voltage: parseFloat((28 + Math.random() * 2).toFixed(2)),
    temperature: parseFloat((20 + Math.random() * 10).toFixed(2))
  };
}

function calculateZScore(currentValue, historicalData) {
  if (historicalData.length < 2) return 0;
  const values = historicalData.map(d => d.power);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = Math.sqrt(
    values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length
  );
  return stdDev !== 0 ? (currentValue - mean) / stdDev : 0;
}

function detectAnomalies(newData, historicalData) {
  if (historicalData.length < WINDOW_SIZE) return null;
  const recentData = historicalData.slice(-WINDOW_SIZE);
  const zScore = calculateZScore(newData.power, recentData);
  const movingAvg = recentData.reduce((sum, d) => sum + d.power, 0) / WINDOW_SIZE;
  const movingAvgDeviation = Math.abs(newData.power - movingAvg) / movingAvg;
  
  return {
    isAnomaly: Math.abs(zScore) > Z_SCORE_THRESHOLD || movingAvgDeviation > 0.2,
    zScore: parseFloat(zScore.toFixed(2)),
    movingAvg: parseFloat(movingAvg.toFixed(2)),
    deviation: parseFloat((movingAvgDeviation * 100).toFixed(2)) + '%'
  };
}

// API Endpoints
app.get('/api/telemetry', (req, res) => {
  res.json({
    current: telemetryData[telemetryData.length - 1] || null,
    history: telemetryData,
    stats: {
      count: telemetryData.length,
      lastUpdated: telemetryData.length ? telemetryData[telemetryData.length - 1].timestamp : null
    }
  });
});

app.get('/api/telemetry/analyze', (req, res) => {
  if (telemetryData.length < 2) {
    return res.status(400).json({ error: 'Insufficient data for analysis' });
  }
  const latest = telemetryData[telemetryData.length - 1];
  const analysis = detectAnomalies(latest, telemetryData);
  res.json({
    reading: latest,
    analysis: analysis || { message: 'Insufficient data for full analysis' },
    thresholds: {
      zScore: Z_SCORE_THRESHOLD,
      windowSize: WINDOW_SIZE
    }
  });
});

app.post('/api/telemetry/next', (req, res) => {
  if (currentIndex >= telemetryData.length - 1) {
    currentIndex = 0;
  }
  const dataPoint = telemetryData[currentIndex++];
  res.json({
    current: dataPoint,
    history: telemetryData.slice(0, currentIndex),
    stats: {
      count: currentIndex,
      lastUpdated: dataPoint.timestamp
    }
  });
});

app.post('/api/telemetry/start-simulation', (req, res) => {
  if (!simulationRunning) {
    simulationRunning = true;
    setInterval(() => {
      const newReading = generateTelemetry();
      telemetryData.push(newReading);
      if (telemetryData.length > MAX_DATA_POINTS) {
        telemetryData.shift();
      }
    }, 1000);
    res.json({ status: 'Simulation started' });
  } else {
    res.json({ status: 'Simulation already running' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Telemetry Server running on port ${PORT}`);
});