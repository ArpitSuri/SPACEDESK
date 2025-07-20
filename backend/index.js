const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const OWM_API_KEY = process.env.OWM_API_KEY || '70a902065bfae7340987acac91691e43';

const PLANET_DATA_SOURCES = {
  mercury: {
    name: "Mercury",
    api: null,
    mockData: {
      temperature: { day: 430, night: -180, unit: "°C" },
      gravity: "3.7 m/s²",
      atmosphere: "Thin exosphere",
      wind: "No significant wind"
    }
  },
  venus: {
    name: "Venus",
    api: null,
    mockData: {
      temperature: { avg: 465, unit: "°C" },
      pressure: "92 bar",
      atmosphere: "96.5% CO₂, 3.5% N₂",
      wind: { speed: "300 km/h", direction: "Retrograde" }
    }
  },
  earth: {
    name: "Earth",
    api: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: "London,UK",
      units: "metric",
      appid: OWM_API_KEY
    }
  },
  mars: {
    name: "Mars",
    api: "https://api.nasa.gov/insight_weather/",
    params: { feedtype: "json", ver: "1.0", api_key: NASA_API_KEY }
  },
  jupiter: {
    name: "Jupiter",
    api: null,
    mockData: {
      temperature: { cloud_tops: -145, unit: "°C" },
      wind: { speed: "600 km/h" },
      great_red_spot: { diameter: "16,350 km", wind_speed: "432 km/h" }
    }
  },
  saturn: {
    name: "Saturn",
    api: null,
    mockData: {
      temperature: { avg: -178, unit: "°C" },
      wind: { speed: "1800 km/h" },
      ring_system: "Ice and rock particles"
    }
  },
  uranus: {
    name: "Uranus",
    api: null,
    mockData: {
      temperature: { avg: -216, unit: "°C" },
      wind: { speed: "900 km/h" },
      axial_tilt: "97.77°"
    }
  },
  neptune: {
    name: "Neptune",
    api: null,
    mockData: {
      temperature: { avg: -214, unit: "°C" },
      wind: { speed: "2100 km/h (fastest in solar system)" }
    }
  }
};

async function fetchPlanetWeather(planet) {
  const planetConfig = PLANET_DATA_SOURCES[planet.toLowerCase()];
  
  if (!planetConfig) throw new Error(`No data available for ${planet}`);

  if (planetConfig.api) {
    try {
      const response = await axios.get(planetConfig.api, { params: planetConfig.params });
      return {
        planet: planetConfig.name,
        data: processPlanetData(planet, response.data),
        source: planetConfig.api,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching ${planet} data:`, error.message);
      throw error;
    }
  }
  else if (planetConfig.mockData) {
    return {
      planet: planetConfig.name,
      data: planetConfig.mockData,
      source: "Scientific estimates",
      timestamp: new Date().toISOString()
    };
  }
  
  return {
    planet: planetConfig.name,
    data: null,
    message: "No weather data available for this planet",
    timestamp: new Date().toISOString()
  };
}

function processPlanetData(planet, rawData) {
  switch (planet.toLowerCase()) {
    case "earth":
      return {
        location: rawData.name,
        coordinates: {
          lat: rawData.coord.lat,
          lon: rawData.coord.lon
        },
        temperature: {
          current: Math.round(rawData.main.temp),
          feels_like: Math.round(rawData.main.feels_like),
          min: Math.round(rawData.main.temp_min),
          max: Math.round(rawData.main.temp_max),
          unit: '°C'
        },
        pressure: {
          value: rawData.main.pressure,
          unit: 'hPa'
        },
        humidity: rawData.main.humidity + '%',
        wind: {
          speed: rawData.wind.speed,
          direction: rawData.wind.deg,
          gust: rawData.wind.gust,
          unit: 'm/s'
        },
        clouds: rawData.clouds.all + '%',
        visibility: (rawData.visibility / 1000).toFixed(1) + ' km',
        conditions: rawData.weather.map(w => w.description).join(', '),
        sunrise: new Date(rawData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(rawData.sys.sunset * 1000).toLocaleTimeString()
      };

    case "mars":
      if (!rawData.sol_keys || rawData.sol_keys.length === 0) {
        throw new Error('No Mars weather data available');
      }
      
      const latestSol = rawData.sol_keys[rawData.sol_keys.length - 1];
      const solData = rawData[latestSol];
      
      return {
        sol: latestSol,
        temperature: {
          average: solData.AT?.av ? Math.round(solData.AT.av) : 'N/A',
          min: solData.AT?.mn ? Math.round(solData.AT.mn) : 'N/A',
          max: solData.AT?.mx ? Math.round(solData.AT.mx) : 'N/A',
          unit: '°C'
        },
        pressure: {
          average: solData.PRE?.av ? Math.round(solData.PRE.av) : 'N/A',
          unit: 'Pa'
        },
        wind: {
          speed: solData.HWS?.av ? Math.round(solData.HWS.av) : 'N/A',
          direction: solData.WD?.most_common?.compass_point || 'N/A',
          unit: 'm/s'
        },
        season: solData.Season || 'N/A'
      };
    
    default:
      return rawData;
  }
}

// API Endpoints
app.get('/api/planets', (req, res) => {
  res.json(Object.keys(PLANET_DATA_SOURCES));
});

app.get('/api/planets/:planet', async (req, res) => {
  try {
    const weather = await fetchPlanetWeather(req.params.planet);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/earth/location/:location', async (req, res) => {
  try {
    const response = await axios.get(PLANET_DATA_SOURCES.earth.api, {
      params: {
        ...PLANET_DATA_SOURCES.earth.params,
        q: req.params.location
      }
    });
    const processedData = processPlanetData('earth', response.data);
    res.json({
      planet: "Earth",
      data: processedData,
      source: PLANET_DATA_SOURCES.earth.api,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Solar Weather Server running on port ${PORT}`);
});